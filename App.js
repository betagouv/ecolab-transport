import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './modes.yaml'

export default () => {
	const [distance, setDistance] = useState(1)
	return (
		<div
			css={`
				margin-top: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
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
					input {
						border-radius: 0.3rem;
						border: 2px solid #7b9fc4;
						width: 4rem;
						margin: 0 0.3rem 0 1rem;
						padding: 0 0.3rem;
						text-align: right;
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
			</section>
			<section>
				<h2>Votre empreinte sur le climat</h2>
				<ul>
					{modes['urbains'].map(mode => (
						<li key={mode} css="margin: .6rem 0; list-style-type: none">
							{mode}
							<div
								css={`
									background: purple;
									height: 1rem;
									margin-top: 0.2rem;
									border-radius: 0.4rem;
									width: ${Math.random() * 100}%;
								`}
							></div>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}
