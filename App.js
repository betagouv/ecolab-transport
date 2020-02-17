import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './modes.yaml'
import Classement from './Classement'
import Input from './Input'

const urlParams = new URLSearchParams(window.location.search)
const distanceInitiale = urlParams.get('distanceInitiale')

export default ({ setRouter }) => {
	const [distance, setDistance] = useState(+distanceInitiale || 10)
	const [options, setOptions] = useState({})
	const limiteUrbain = +modes['limite trajet urbain'].split('km')[0],
		modesCommuns = modes['les deux'],
		modesPertinents =
			distance > limiteUrbain
				? [...modes['extra-urbains'], ...modesCommuns]
				: [...modes['urbains'], ...modesCommuns],
		dansIntervalle = (intervalle, unité) => {
			const de = +intervalle.split('-')[0],
				àRaw = intervalle.split('-')[1].split(' ' + unité)[0],
				à = àRaw === '∞' ? Infinity : +àRaw

			return distance > de && distance <= à
		},
		facteur = (m, { voyageurs, propulsion } = {}) => {
			const parPersonne = m['gCO2e/km/personne']

			if (m.titre.includes('voiture')) {
				const parVoiture = m.voyageurs * parPersonne
				return parVoiture / (voyageurs || m.voyageurs)
			}

			if (m.titre === 'TER') {
				return parPersonne[propulsion || 'moyenne']
			}
			if (
				['bus thermique', 'tram ou trolleybus', 'ferry', 'TER'].includes(
					m.titre
				)
			) {
				/* Once the inhabitants and other variables are known :
				return Object.entries(parPersonne).find(
					([intervalle]) => dansIntervalle
				)[1]

				*/
				const valeurs = Object.values(parPersonne)
				return valeurs.reduce((memo, next) => memo + next, 0) / valeurs.length
			}
			if (m.titre === 'avion') {
				let chiffresPertinents = Object.values(parPersonne)
					.map(intervalles =>
						Object.entries(intervalles).find(([intervalle]) =>
							dansIntervalle(intervalle, 'km')
						)
					)
					.filter(Boolean)
				return (
					chiffresPertinents.reduce((memo, [, next]) => memo + next, 0) /
					chiffresPertinents.length
				)
			}
			return parPersonne
		},
		classement = modesPertinents.sort(
			(m1, m2) => facteur(m1, options) - facteur(m2, options)
		),
		empreinteMaximum =
			distance * facteur(classement[classement.length - 1], options)

	return (
		<div
			css={`
				padding: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				ul {
					padding: 0;
				}
				h1 {
					font-size: 160%;
					margin: 0.5rem;
				}

				h1 em {
					color: purple;
					font-style: normal;
				}

				header {
					margin-bottom: 0.1rem;
				}
			`}
		>
			<header>
				<div css="background: purple; margin-left: 1rem; padding: 0 .6rem; font-size: 90%; text-align: center; color: white; border-radius: .6rem; width: 3rem; margin: .6rem auto; font-weight: 900">
					beta
				</div>
				<div
					css={`
						display: flex;
						justify-content: center;
						align-items: center;
					`}
				>
					<img css="height: 6vh" src={logoAdeme} />
					<a href="https://ecolab.ademe.fr">
						<img css="height: 5vh" src={logoEcolab} />
					</a>
				</div>
				<h1>
					Votre empreinte <em>climat</em>
				</h1>
			</header>
			<Input {...{ distance, setDistance, modes }} />
			<Classement
				{...{
					classement,
					options,
					setOptions,
					facteur,
					distance,
					empreinteMaximum
				}}
			/>
			<div>
				<button onClick={() => setRouter('integration')}>
					Intégrez ce calculateur sur votre site{' '}
				</button>
			</div>
		</div>
	)
}
