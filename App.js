import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './modes.yaml'

const shadowStyle =
		'box-shadow: 0px 2px 4px -1px rgba(41, 117, 209, 0.2), 0px 4px 5px 0px rgba(41, 117, 209, 0.14), 0px 1px 10px 0px rgba(41, 117, 209, 0.12)',
	blue = '#7b9fc4'

export default () => {
	const [distance, setDistance] = useState(1)
	const limiteUrbain = +modes['limite trajet urbain'].split('km')[0],
		modesCommuns = modes['les deux'],
		modesPertinents =
			distance > limiteUrbain
				? [...modes['extra-urbains'], ...modesCommuns]
				: [...modes['urbains'], ...modesCommuns],
		valeur = m => m['gCO2e/km/passager'] || m['gCO2e/km/véhicule'],
		classement = modesPertinents.sort((m1, m2) => valeur(m1) < valeur(m2)),
		empreinteMaximum = valeur(classement[0])
	return (
		<div
			css={`
				margin: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				ul {
					padding: 0;
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
					<img css="width: 4rem" src={logoAdeme} />
					<img css="width: 10rem" src={logoEcolab} />
				</div>
				<h1>Mon déplacement est-il écolo ?</h1>
			</header>
			<section
				css={`
					font-size: 160%;
					margin: 1rem;

					max-width: 30rem;
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
					Quelle distance ?
					<input
						type="number"
						max="40000"
						min="0"
						value={distance}
						onChange={({ target: { value } }) => setDistance(value)}
					/>
					km
				</label>
				<div
					css={`
						ul {
							font-size: 75%;
						}
						li {
							display: inline-block;
							margin: 0.1rem 0.4rem;
						}
						li a {
							font-size: 80%;
						}
					`}
				>
					<ul>
						{modes.suggestions.map(({ titre, km }) => (
							<li key={titre}>
								<a
									href="#"
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
					h2 {
						margin-bottom: 0.1rem;
					}
					small {
						margin-bottom: 2rem;
						font-style: italic;
					}
				`}
			>
				<h2>Votre empreinte sur le climat</h2>
				<small>En grammes de gaz à effet de serre (gCO2e/passager)</small>
				<ul>
					{classement.map(mode => (
						<li key={mode.titre} css="margin: .6rem 0; list-style-type: none">
							{mode.titre}
							<div>
								<span
									css={`
										display: inline-block;
										background: purple;
										margin-top: 0.2rem;
										height: 1.2rem;
										border-radius: 0.4rem;
										padding-left: 0.4rem;
										width: ${(valeur(mode) / empreinteMaximum) * 100}%;
										color: white;
										${shadowStyle}
									`}
								>
									{valeur(mode)}
								</span>
							</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}
