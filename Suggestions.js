import React from 'react'

export default ({ modes, distance, setDistance }) => (
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
)
