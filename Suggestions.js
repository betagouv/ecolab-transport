import React from 'react'
import suggestions from './suggestions.yaml'
import Emoji from './Emoji'

export default ({ distance, setDistance }) => (
	<div
		css={`
			margin-top: 1rem;

			ul {
				display: flex;
				justify-content: center;
				justify-items: center;
				flex-wrap: wrap;
				font-size: 75%;
				padding: 0.6rem;
				margin: 0rem;
			}
			@media (pointer: coarse) {
				ul {
					line-height: 2rem;
					display: block;
					white-space: nowrap;
					overflow-x: auto;
					width: 90vw;
					margin: 0 auto;
					text-align: center;
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
			{suggestions.map(({ titre, km }) => (
				<li key={titre}>
					<a
						onClick={() => setDistance(km)}
						css={distance === km ? `background: yellow;` : ``}
					>
						<Emoji emoji={titre} />
					</a>
				</li>
			))}
		</ul>
	</div>
)
