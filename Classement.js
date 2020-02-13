import React from 'react'
import { shadowStyle } from './styles'
import Covoitureurs from './Covoitureurs'
import Value from './Value'

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
			<small
				css={`
					display: inline-block;
					color: purple;
					font-style: italic;
				`}
			>
				En équivalent CO2 par personne
			</small>
			<ul
				css={`
					margin-left: 2rem;

					@media (min-width: 800px) {
						width: 35rem;
					}
				`}
			>
				{classement.map(mode => (
					<li key={mode.titre} css="margin: .6rem 0; list-style-type: none">
						<div>
							<span>{capitalizeFirst(mode.titre)}</span>

							{mode.titre.includes('voiture') && (
								<Covoitureurs
									voyageurs={options.voyageurs || mode.voyageurs}
									setVoyageurs={n => setOptions({ ...options, voyageurs: n })}
								/>
							)}
						</div>
						<div
							css={`
								display: flex;
								align-items: center;
							`}
						>
							<span css="font-size: 100%; width: 1.5rem; margin-left: -2rem; margin-right: .6rem">
								{mode.icônes}
							</span>
							<span
								css={`
									display: inline-block;
									background: purple;
									margin-top: 0.2rem;
									margin-right: 0.8rem;
									height: 1rem;
									padding-left: 0.1rem;
									border-radius: 0.4rem;
									width: ${((distance * facteur(mode, options)) /
										empreinteMaximum) *
										100 *
										0.9}%;
									color: white;
									${shadowStyle}
								`}
							></span>
							<Value {...{ mode, facteur, options, distance }} />
						</div>
					</li>
				))}
			</ul>
		</div>
		{showBudget && (
			<span css=" background: yellow ;">
				Budget climat 1 journée {transportClimateBudget.toFixed(1)} kg
			</span>
		)}
	</section>
)
const capitalizeFirst = text =>
	text[0].toUpperCase() + text.slice(1, text.length)
