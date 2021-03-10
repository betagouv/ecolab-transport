import React, { useState } from 'react'
import Suggestions from './Suggestions'
import { blue, shadowStyle } from './styles'
export default ({ distance, setDistance }) => {
	const [pristine, setPristine] = useState(true)
	let timer = null
	return (
		<section
			css={`
				margin: 0 0 0.4rem 0;
				font-size: 140%;

				label {
					text-align: center;
				}

				input {
					border-radius: 0.3rem;
					border: 2px solid ${blue};
					width: 6rem;
					margin: 0 0.5rem 0 1rem;
					padding: 0 0.3rem;
					text-align: right;
					font-size: inherit;
					${shadowStyle}
				}
				input[type='number']::-webkit-inner-spin-button,
				input[type='number']::-webkit-outer-spin-button {
					-webkit-appearance: none;
				}

				input[type='number'] {
					-moz-appearance: textfield;
				}
			`}
		>
			<label>
				<div css="margin-top: .8rem;">
					pour
					<input
						type="number"
						max="40000"
						min="0"
						value={distance}
						onChange={({ target: { value } }) => {
							setDistance(value)
							if (pristine) {
								window._paq.push([
									'trackEvent',
									'Suggestion',
									'distance',
									value,
								])
							}
							setPristine(false)
							clearTimeout(timer)
							timer = setTimeout(() => setPristine(true), 2000)
						}}
					/>
					km
				</div>
			</label>
			<Suggestions {...{ distance, setDistance }} />
		</section>
	)
}
