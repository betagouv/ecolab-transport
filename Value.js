import React from 'react'

const humanWeightUnit = v =>
	v === 0
		? [v, '']
		: v < 1
		? [v * 1000, 'g']
		: v < 1000
		? [v, 'kg']
		: [v / 1000, 't']

export default ({ facteur, mode, options, distance }) => {
	const [value, unit] = humanWeightUnit(
		distance * (facteur(mode, options) / 1000)
	)
	return (
		<span css="color: purple; font-weight: 600; vertical-align: baseline;">
			{Math.round(value)}&nbsp;{unit}
		</span>
	)
}
