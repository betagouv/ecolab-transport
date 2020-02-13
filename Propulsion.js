import React from 'react'

export default ({ propulsion = 'moyenne', setPropulsion }) => {
	return (
		<span
			css={`
				margin-left: 0.6rem;
				button {
					border: none;
					background: none;
					margin: 0 0.1rem;
					width: 2rem;
					cursor: pointer;
					padding: 0.3rem;
					border: 1px solid white;
					border-radius: 2.7rem;
				}
				button.selected {
					background: white;
					border: 1px solid purple;
				}
			`}
		>
			<button
				className={propulsion == 'diesel' ? 'selected' : ''}
				onClick={() => setPropulsion('diesel')}
			>
				⛽
			</button>
			<button
				className={propulsion == 'électricité' ? 'selected' : ''}
				onClick={() => setPropulsion('électricité')}
			>
				⚡
			</button>
			{propulsion !== 'moyenne' && (
				<button onClick={() => setPropulsion('moyenne')}>X</button>
			)}
		</span>
	)
}
