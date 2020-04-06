import React, { useState } from 'react'

import modes from './ges-transport.yaml'
import Classement from './Classement'
import Input from './Input'
import facteur from './calcul'

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
		classement = modesPertinents.sort(
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
			<h1>
				Votre impact <em>climat</em>
			</h1>
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
			<div>
				<button onClick={() => setRouter('integration')}>
					Intégrez ce calculateur sur votre site{' '}
				</button>
			</div>
		</div>
	)
}
