import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './modes.yaml'
import Covoitureurs from './Covoitureurs'

const shadowStyle =
		'box-shadow: 0px 2px 4px -1px rgba(41, 117, 209, 0.2), 0px 4px 5px 0px rgba(41, 117, 209, 0.14), 0px 1px 10px 0px rgba(41, 117, 209, 0.12)',
	blue = '#7b9fc4'

export default ({ setRouter }) => {
	const [distance, setDistance] = useState(10)
	const [options, setOptions] = useState({})
	const limiteUrbain = +modes['limite trajet urbain'].split('km')[0],
		modesCommuns = modes['les deux'],
		modesPertinents =
			distance > limiteUrbain
				? [...modes['extra-urbains'], ...modesCommuns]
				: [...modes['urbains'], ...modesCommuns],
		dansIntervalle = (intervalle, unité) => {
			const de = +intervalle.split('-')[0],
				àRaw = intervalle.split('-')[1].split(' ' + unité)[0],
				à = àRaw === '∞' ? Infinity : +àRaw

			return distance > de && distance <= à
		},
		valeur = (m, { voyageurs } = {}) => {
			const parPersonne = m['gCO2e/km/personne']

			if (m.titre.includes('voiture')) {
				const parVoiture = m.voyageurs * parPersonne
				return parVoiture / (voyageurs || m.voyageurs)
			}

			if (m.titre === 'TER') {
			}
			if (
				['bus thermique', 'tram ou trolleybus', 'ferry', 'TER'].includes(
					m.titre
				)
			) {
				/* Once the inhabitants and other variables are known :
				return Object.entries(parPersonne).find(
					([intervalle]) => dansIntervalle
				)[1]

				*/
				const valeurs = Object.values(parPersonne)
				return valeurs.reduce((memo, next) => memo + next, 0) / valeurs.length
			}
			if (m.titre === 'avion') {
				let chiffresPertinents = Object.values(parPersonne)
					.map(intervalles =>
						Object.entries(intervalles).find(([intervalle]) =>
							dansIntervalle(intervalle, 'km')
						)
					)
					.filter(Boolean)
				return (
					chiffresPertinents.reduce((memo, [, next]) => memo + next, 0) /
					chiffresPertinents.length
				)
			}
			return parPersonne
		},
		classement = modesPertinents.sort((m1, m2) => valeur(m1) - valeur(m2)),
		empreinteMaximum = valeur(classement[classement.length - 1]),
		valeurAffichée = valeur => {
			const résultat = (valeur / 1000) * distance
			return résultat === 0
				? 0
				: résultat < 10
				? résultat.toFixed(1)
				: Math.round(résultat)
		}

	return (
		<div
			css={`
				padding: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				ul {
					padding: 0;
				}
				h1 {
					font-size: 180%;
					margin: 0.5rem;
				}

				h1 em {
					color: purple;
					font-style: normal;
				}

				header {
					margin-bottom: 0.1rem;
				}
			`}
		>
			<header>
				<div
					css={`
						display: flex;
						justify-content: center;
						align-items: center;
					`}
				>
					<img css="height: 6vh" src={logoAdeme} />
					<a href="https://ecolab.ademe.fr">
						<img css="height: 5vh" src={logoEcolab} />
					</a>
				</div>
				<h1>
					Déplacements <em>écolo</em>
				</h1>
			</header>
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
							onChange={({ target: { value } }) => setDistance(value)}
						/>
						km
					</div>
				</label>
				<div
					css={`
						ul {
							font-size: 75%;
							padding: 0.6rem;
							margin: 0rem;
						}
						@media (max-width: 800px) {
							ul {
								white-space: nowrap;
								overflow-x: auto;
								width: 90vw;
							}
						}
						li {
							display: inline-block;
							margin: 0rem 0.4rem;
						}
						li a {
							font-size: 80%;
							cursor: pointer;
							padding: 0.1rem 0.3rem;
						}
						li a:hover {
							background: purple;
							color: white;
							border-radius: 0.3rem;
						}
					`}
				>
					<ul>
						{modes.suggestions.map(({ titre, km }) => (
							<li key={titre}>
								<a
									onClick={() => setDistance(km)}
									css={distance === km ? `background: yellow;` : ``}
								>
									{titre}
								</a>
							</li>
						))}
					</ul>
				</div>
			</section>
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

			<div>
				<button onClick={() => setRouter('integration')}>
					Intégrez ce calculateur sur votre site{' '}
				</button>
			</div>
		</div>
	)
}
const capitalizeFirst = text =>
	text[0].toUpperCase() + text.slice(1, text.length)
