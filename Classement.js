import React from 'react'
import { shadowStyle, blue } from './styles'
import Covoitureurs from './Covoitureurs'

export default ({
	classement,
	options,
	setOptions,
	valeurAffichée,
	valeur,
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
			ul {
				margin-left: 2rem;
			}
		`}
	>
		<h2>Votre empreinte climat</h2>
		<small>En kilos de gaz à effet de serre (kg CO2e) par personne</small>
		<ul>
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
								width: ${(valeur(mode, options) / empreinteMaximum) *
									100 *
									0.9}%;
								color: white;
								${shadowStyle}
							`}
						></span>
						<span css="color: purple; font-weight: 600; vertical-align: baseline;">
							{valeurAffichée(valeur(mode, options))}
						</span>
					</div>
				</li>
			))}
		</ul>
	</section>
)
const capitalizeFirst = text =>
	text[0].toUpperCase() + text.slice(1, text.length)
