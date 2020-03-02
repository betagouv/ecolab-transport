import React, { useState } from 'react'
import Mode from './Mode'
import { capitalizeFirst } from './Mode'
import { motion } from 'framer-motion'
import Emoji from './Emoji'
import { transportClimateBudget, limits } from './limits.js'

const showBudget = true

export default ({
	classement,
	options,
	setOptions,
	facteur,
	distance,
	empreinteMaximum
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
				@media (min-width: 800px) {
					margin: 2rem;
				}
				h2,
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
				<ul
					css={`
						margin-left: 2rem;

						@media (min-width: 800px) {
							width: 35rem;
						}
					`}
				>
					{classement.map(mode => (
						<motion.li
							layoutTransition={{
								type: 'spring',
								damping: 100,
								stiffness: 100
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
									facteur,
									setOptions,
									empreinteMaximum,
									setDetails
								}}
							/>
						</motion.li>
					))}
				</ul>
			</div>
			{showBudget && (
				<>
					<p>
						Pour rester sous les 2 degrés de réchauffement (accord de Paris) :
					</p>
					<ol css="list-style-type: none">
						{limits.map(([color, , text]) => (
							<li key={color}>
								<span
									css={`
										vertical-align: middle;
										margin-right: 1rem;
										display: inline-block;
										border: 1px solid black;
										width: 1rem;
										height: 1rem;
										background: ${color};
									`}
								></span>
								{text}
							</li>
						))}
					</ol>
				</>
			)}
			<Legende />
		</section>
	)
}

const Legende = () => (
	<small
		css={`
			display: inline-block;
			color: purple;
			font-style: italic;
			margin-bottom: 1rem;
			margin: 0 auto;
			display: block;
		`}
	>
		En équivalent CO2 par personne en France. <Emoji emoji="👆" /> Cliquer sur
		les barres pour plus d'info.
	</small>
)
