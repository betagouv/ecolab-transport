import React, { useState } from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import modes from './modes.yaml'

export default () => {
	const [distance, setDistance] = useState(1)
	return (
		<div
			css={`
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
						justify-content: space-around;
						align-items: center;
						img {
							width: 5rem;
						}
					`}
				>
					<img src={logoAdeme} />
					<img src={logoEcolab} />
				</div>
				<h1>Mes déplacements sont-ils écolo ?</h1>
			</header>
			<section>
				<label>
					Quelle distance ?
					<input
						type="number"
						max="40000"
						min="0"
						value={distance}
						onChange={({ target: { value } }) => setDistance(value)}
					/>
				</label>
			</section>
			<section>
				{modes['urbains'].map(mode => (
					<li key={mode}>{mode}</li>
				))}
			</section>
		</div>
	)
}
