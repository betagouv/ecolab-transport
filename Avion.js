import React from 'react'

export default ({
	setDetails,
	mode,
	facteur,
	distance,
	options,
	empreinteMaximum,
	shadowStyle,
	barStyle,
}) => {
	const facteurSur = facteur(distance, mode, options).more['sans trainées'],
		facteurMoinsSur = facteur(distance, mode, options).more['avec trainées'],
		diff = facteurMoinsSur - facteurSur

	return (
		<>
			<span
				onClick={() => setDetails(mode)}
				css={`
				${barStyle}
					width: ${((distance * facteurSur) / empreinteMaximum) * 100 * 0.9}%;
					margin-right: 2px;
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
					${shadowStyle}
				`}
			></span>
			<span
				onClick={() => setDetails(mode)}
				css={`
				${barStyle}
					width: ${((distance * diff) / empreinteMaximum) * 100 * 0.9}%;
					background:   linear-gradient(to right, purple, #a665a67a); 
					/* The gradient represents the incertainty of this measure. We attribute a diluted purple to the end of the bar since it represents the most probable value. The most extreme but plausible value, not painted here, would be pure white.
					 */
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
					${shadowStyle}
				`}
			></span>
		</>
	)
}
