import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './modes.yaml'
import Classement from './Classement'
import Input from './Input'

import { shadowStyle, blue } from './styles'

export default ({ setRouter }) => {
	const [distance, setDistance] = useState(10)
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
		facteur = (m, { voyageurs } = {}) => {
			const parPersonne = m['gCO2e/km/personne']

			if (m.titre.includes('voiture')) {
				const parVoiture = m.voyageurs * parPersonne
				return parVoiture / (voyageurs || m.voyageurs)
			}

			if (m.titre === 'TER') {
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
		classement = modesPertinents.sort((m1, m2) => facteur(m1) - facteur(m2)),
		a = console.log('clas', classement),
		empreinteMaximum = distance * facteur(classement[classement.length - 1]),
		valeurAffichée = facteur => {
			const résultat = (facteur / 1000) * distance
			return résultat === 0
				? 0
				: résultat < 10
				? résultat.toFixed(1)
				: Math.round(résultat)
		}

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
					font-size: 180%;
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
					Déplacements <em>écolo</em>
				</h1>
			</header>
			<Input {...{ distance, setDistance, modes }} />
			<Classement
				{...{
					classement,
					options,
					setOptions,
					valeurAffichée,
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
