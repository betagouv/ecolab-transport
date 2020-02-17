import React from 'react'
import Emoji from './Emoji'

export default ({ voyageurs, setVoyageurs }) => {
	return (
		<span
			css={`
				margin-left: 0.6rem;
				button {
					margin: 0 0.3rem;
				}
			`}
		>
			<button
				onClick={() =>
					setVoyageurs(voyageurs >= 2 ? Math.round(voyageurs - 1) : 1)
				}
			>
				-
			</button>
			<span>
				{[...Array(Math.round(voyageurs))].map(() => (
					<Emoji emoji="🧑" />
				))}
			</span>
			<button
				onClick={() =>
					voyageurs === 7 ? null : setVoyageurs(Math.round(voyageurs + 1))
				}
			>
				+
			</button>
		</span>
	)
}
