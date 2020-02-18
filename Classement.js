import React from 'react'
import Mode from './Mode'

const showBudget = false
const // Rough estimate of the 2050 budget per person to stay under 2° by 2100
	climateBudgetPerYear = 2000,
	climateBudgetPerDay = climateBudgetPerYear / 365,
	// Based on current share of the annual mean of 12 ton per french
	// Source : http://ravijen.fr/?p=440
	transportShare = 1 / 4,
	transportClimateBudget = climateBudgetPerDay * transportShare

export default ({
	classement,
	options,
	setOptions,
	facteur,
	distance,
	empreinteMaximum
}) => (
	<section
		css={`
			@media (min-width: 800px) {
				margin: 2rem;
			}
			h2,
			small {
				text-align: center;
			}
			small {
			}
			h2 {
				margin: 0.6rem 0 0.1rem;
				font-size: 140%;
			}
		`}
	>
		<div
			css={`
				position: relative;
			`}
		>
			<span
				css={`
				${!showBudget ? 'display: none' : ''}
				height: 100%;
				left: 0;
				z-index: -1;
				left: ${((transportClimateBudget * 1000) / empreinteMaximum) * 100 * 0.9}%;

				width: 0px;
				border-right: 8px dotted yellow;
		        position: absolute;
				margin-top: 2rem;
				}
					`}
				key="budget"
			></span>
			<ul
				css={`
					margin-left: 2rem;

					@media (min-width: 800px) {
						width: 35rem;
					}
				`}
			>
				{classement.map(mode => (
					<Mode
						{...{
							mode,
							options,
							distance,
							facteur,
							setOptions,
							empreinteMaximum
						}}
					/>
				))}
			</ul>
		</div>
		<small
			css={`
				display: inline-block;
				color: purple;
				font-style: italic;
				margin-bottom: 1rem;
			`}
		>
			En équivalent CO2 par personne en France.
		</small>
		{showBudget && (
			<span css=" background: yellow ;">
				Budget climat 1 journée {transportClimateBudget.toFixed(1)} kg
			</span>
		)}
	</section>
)
