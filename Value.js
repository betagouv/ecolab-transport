import React from 'react'

const humanWeightUnit = (v) =>
	v === 0
		? [v, '']
		: v < 1
		? [v * 1000, 'g']
		: v < 1000
		? [v, 'kg']
		: [v / 1000, 't']

export default ({ facteurValue, mode, options, distance }) => {
	const [value, unit] = humanWeightUnit(
		distance * (facteurValue(distance, mode, options) / 1000)
	)
	return (
		<span css="color: purple; font-weight: 600; vertical-align: baseline;">
			{value < 10 ? value.toFixed(1) : Math.round(value)}&nbsp;{unit}
		</span>
	)
}
