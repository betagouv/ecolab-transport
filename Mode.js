import { shadowStyle } from './styles'
import Covoitureurs from './Covoitureurs'
import Propulsion from './Propulsion'
import Value from './Value'
import Emoji from './Emoji'
import React from 'react'
import { transportClimateBudget, limits } from './limits.js'

export default ({
	mode,
	options,
	setOptions,
	distance,
	facteur,
	empreinteMaximum,
	setDetails
}) => (
	<>
		<div>
			<span onClick={() => setDetails(mode)}>
				{capitalizeFirst(mode.titre)}
			</span>

			{mode.titre.includes('voiture') && (
				<Covoitureurs
					voyageurs={options.voyageurs || mode.voyageurs}
					setVoyageurs={n => setOptions({ ...options, voyageurs: n })}
				/>
			)}
			{false && //Le choix de la propulsion TER est en test
				mode.titre.includes('TER') && (
					<Propulsion
						propulsion={options.propulsion}
						setPropulsion={propulsion => setOptions({ ...options, propulsion })}
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
				css="font-size: 100%; width: 1.5rem; margin-left: -2rem; margin-right: .6rem"
			>
				<Emoji emoji={mode.icônes} />
			</span>
			<Bars
				{...{
					onClick: () => setDetails(mode),
					distance,
					facteur,
					mode,
					options,
					empreinteMaximum,
					shadowStyle
				}}
			/>
			<Value {...{ mode, facteur, options, distance }} />
		</div>
	</>
)
export const capitalizeFirst = text =>
	text[0].toUpperCase() + text.slice(1, text.length)

const Bars = ({
	onClick,
	distance,
	facteur,
	mode,
	options,
	empreinteMaximum,
	shadowStyle
}) => {
	const calculateWidth = gCO2 => (gCO2 / empreinteMaximum) * 100 * 0.8 // 0.8 to give enough space for the figure in CO2e, else its variability makes the width of the bar change for the same value
	const width = calculateWidth(distance * facteur(distance, mode, options)),
		limitWidth = calculateWidth(transportClimateBudget * 1000),
		aboveLimit = width > limitWidth

	return (
		<>
			<Bar
				{...{
					onClick,
					shadowStyle,
					width: aboveLimit ? limitWidth : width,
					style: aboveLimit ? 'left' : 'whole'
				}}
			/>
			{aboveLimit && (
				<Bar
					{...{
						onClick,
						shadowStyle,
						width: width - limitWidth,
						style: 'right'
					}}
				/>
			)}
		</>
	)
}

const Bar = ({ onClick, shadowStyle, width, style }) => (
	<span
		onClick={onClick}
		css={`
			display: inline-block;
			background: purple;
			margin-top: 0rem;
			height: 1.1rem;
			padding-left: 0.1rem;
			${
				style === 'whole'
					? 'border-radius: .4rem;'
					: style === 'right'
					? `
			border-top-right-radius: .4rem;
			border-bottom-right-radius: .4rem;
			`
					: `
			border-top-left-radius: .4rem;
			border-bottom-left-radius: .4rem;
			`
			}
			background: ${{ left: 'purple', right: 'red', whole: 'purple' }[style]};
			margin: 0 .1rem;
			width: ${width}%;
			color: white;
			${shadowStyle}
		`}
	></span>
)
