import React from 'react'
import { shadowStyle } from './styles'
import Covoitureurs from './Covoitureurs'

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
	valeurAffichée,
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
			small {
				font-style: italic;
				display: inline-block;
			}
		`}
	>
		<h2>Votre empreinte climat</h2>
		{console.log('azd', transportClimateBudget, empreinteMaximum)}
		<div
			css={`
				position: relative;
			`}
		>
			<span
				css={`
				height: 100%;
				left: 0;
				z-index: -1;
				width: ${((transportClimateBudget * 1000) / empreinteMaximum) * 100 * 0.9}%;
				background:	#beffbe;
				border-radius: .6rem;
		        position: absolute;
				}
					`}
				key="budget"
			></span>
			<span css="font-weight: 800">Budget climat transport</span>
			<ul
				css={`
					margin-left: 2rem;
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
							<span css="color: purple; font-weight: 600; vertical-align: baseline;">
								{valeurAffichée(facteur(mode, options))}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
		<small>En kilos de gaz à effet de serre (kg CO2e) par personne</small>
	</section>
)
const capitalizeFirst = text =>
	text[0].toUpperCase() + text.slice(1, text.length)
