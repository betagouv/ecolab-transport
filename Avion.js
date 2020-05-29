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
					background:   linear-gradient(to right, purple, white);
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
					${shadowStyle}
				`}
			></span>
		</>
	)
}
