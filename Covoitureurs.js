import React from 'react'

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
					<span>🧑</span>
				))}
			</span>
			<button onClick={() => setVoyageurs(Math.round(voyageurs + 1))}>+</button>
		</span>
	)
}
