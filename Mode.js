import { shadowStyle } from './styles'
import Covoitureurs from './Covoitureurs'
import Propulsion from './Propulsion'
import Value from './Value'
import Emoji from './Emoji'
import React from 'react'
import { facteur, facteurValue } from './calcul'
import Avion from './Avion'

const barStyle = `
					display: inline-block;
					background: purple;
					margin-top: 0rem;
					margin-right: 0.8rem;
					height: 1.1rem;
					padding-left: 0.1rem;
					border-radius: 0.4rem;
					color: white;
					`

export default ({
	mode,
	options,
	setOptions,
	distance,
	empreinteMaximum,
	setDetails,
}) => (
	<>
		<div>
			<span onClick={() => setDetails(mode)}>
				{capitalizeFirst(mode.titre)}
			</span>

			{mode.titre.includes('voiture') && (
				<Covoitureurs
					voyageurs={options.voyageurs || mode.voyageurs}
					setVoyageurs={(n) => setOptions({ ...options, voyageurs: n })}
				/>
			)}
			{false && //Le choix de la propulsion TER est en test
				mode.titre.includes('TER') && (
					<Propulsion
						propulsion={options.propulsion}
						setPropulsion={(propulsion) =>
							setOptions({ ...options, propulsion })
						}
					/>
				)}
		</div>
		<div
			css={`
				display: flex;
				align-items: center;
			`}
		>
			<span
				onClick={() => setDetails(mode)}
				css={`
					font-size: 100%;
					width: 2.3rem;
					margin-left: -2.3rem;
				`}
			>
				<Emoji emoji={mode.icône} />
				{mode['icône secondaire'] && (
					<span css="font-size: 60%">
						<Emoji emoji={mode['icône secondaire']} />
					</span>
				)}
			</span>

			{mode.titre === 'avion' ? (
				<Avion
					{...{
						setDetails,
						mode,
						facteur,
						distance,
						options,
						empreinteMaximum,
						shadowStyle,
						barStyle,
					}}
				/>
			) : (
				<span
					onClick={() => setDetails(mode)}
					css={`
				${barStyle}
					width: ${
						((distance * facteur(distance, mode, options)) / empreinteMaximum) *
						100 *
						0.8
					}%;
					${shadowStyle}
				`}
				></span>
			)}
			<Value {...{ mode, facteurValue, options, distance }} />
		</div>
	</>
)
export const capitalizeFirst = (text) =>
	text[0].toUpperCase() + text.slice(1, text.length)
