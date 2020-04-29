import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './ges-transport.yaml'
import Classement from './Classement'
import Input from './Input'
import facteur from './calcul'

console.log(
	"modes n'ayant de pas de bornes min et max définies",
	modes.filter((mode) => !mode.bornes).map((mode) => mode.titre)
)

const urlParams = new URLSearchParams(window.location.search)
const distanceInitiale = urlParams.get('distanceInitiale')

export default ({ setRouter }) => {
	const [distance, setDistance] = useState(+distanceInitiale || 10)
	const [options, setOptions] = useState({})

	const classement = modes
			.filter(({ bornes }) => {
				if (!bornes) return true
				const min = bornes.split('à partir de ')
				const max = bornes.split("jusqu'à ")
				if (min.length > 1 && max.length > 1)
					throw Error('Pas implémenté encore')
				if (min.length > 1) {
					return distance >= +min[1].split('km')[0]
				}
				if (max.length > 1) {
					return distance <= +max[1].split('km')[0]
				}
			})
			.sort(
				(m1, m2) =>
					facteur(distance, m1, options) - facteur(distance, m2, options)
			),
		empreinteMaximum =
			distance * facteur(distance, classement[classement.length - 1], options)

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
					text-align: center;
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
					{false && <img css="height: 6vh" src={logoAdeme} />}
					<a href="https://ecolab.ademe.fr">
						<img css="height: 5vh" src={logoEcolab} />
					</a>
				</div>
				<h1 css="position: relative">
					Votre impact <em>climat</em>
					<VersionBeta />
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
					empreinteMaximum,
				}}
			/>
			<div css="text-align: center">
				<button css="margin: 1rem" onClick={() => setRouter('integration')}>
					Intégrez ce calculateur sur votre site{' '}
				</button>
				<NousContacer />
			</div>
		</div>
	)
}

const VersionBeta = () => (
	<span
		css={`
			display: inline-block;
			width: 2.2rem;
			background: #83a7c9;
			padding: 0 0.2rem;
			font-size: 45%;
			text-align: center;
			color: white;
			border-radius: 0.6rem;
			margin: 0 0.3rem;
			font-weight: 900;
			position: absolute;
			right: -2.6rem;
			transform: rotate(35deg);
		`}
	>
		beta
	</span>
)

const NousContacer = () => (
	<div css="max-width: 30rem; text-align: center">
		Une question, une suggestion ?{' '}
		<a href="https://airtable.com/shr0MkHMKnpkWil7F">
			Faites-nous part de vos retours !
		</a>
	</div>
)
