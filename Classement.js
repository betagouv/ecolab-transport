import React, { useState } from 'react'
import Mode from './Mode'
import { capitalizeFirst } from './Mode'
import { motion } from 'framer-motion'

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
	distance,
	empreinteMaximum,
}) => {
	const [details, setDetails] = useState(null)
	return details ? (
		<div
			css={`
				background: white;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 1rem;
				margin: 1rem;
				min-height: 20rem;
				background: #f3f2fd;
				border-radius: 1rem;
				max-width: 80%;
				width: 40rem;
				button {
					margin: 1rem;
				}
			`}
		>
			<h2>{capitalizeFirst(details.titre)}</h2>
			{details.note && <p>{details.note}</p>}
			{details.source && (
				<a href={details.source} target="_blank">
					Source
				</a>
			)}
			<button onClick={() => setDetails(null)}>Retour</button>
		</div>
	) : (
		<section
			css={`
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
					{classement.map((mode) => (
						<motion.li
							layoutTransition={{
								type: 'spring',
								damping: 100,
								stiffness: 100,
							}}
							key={mode.titre}
							css="margin: .6rem 0; list-style-type: none; cursor: pointer"
						>
							<Mode
								{...{
									mode,
									options,
									setOptions,
									distance,
									setOptions,
									empreinteMaximum,
									setDetails,
								}}
							/>
						</motion.li>
					))}
				</ul>
			</div>
			<small
				css={`
					text-align: center;
					display: inline-block;
					color: purple;
					font-style: italic;
					margin-bottom: 1rem;
					p {
						margin: 0.3rem;
					}
					margin: 0 auto;

					display: block;
				`}
			>
				<p>Équivalent CO₂ par personne en France, phase d'usage uniquement.</p>
				<p>Sources : cliquer sur les dfférents modes.</p>
			</small>
			{showBudget && (
				<span css=" background: yellow ;">
					Budget climat 1 journée {transportClimateBudget.toFixed(1)} kg
				</span>
			)}
		</section>
	)
}
