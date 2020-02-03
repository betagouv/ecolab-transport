import React, { useEffect } from 'react'

const src = 'https://ecolab-transport.netlify.com/iframe.js'
export default ({ setRouter }) => {
	useEffect(() => {
		const script = document.createElement('script')

		script.src = src
		script.id = 'ecolab-transport'
		script.dataset.couleur = 'purple'
		script.dataset.fromUE = 'yes'

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	return (
		<div>
			<h1>Intégrez le module de calcul sur votre site Web</h1>
			<p>En ajoutant une ligne à votre page Web :</p>
			<IntegrationCode />
			<p>Voici ce que donne l'intégration</p>
			<button onClick={() => setRouter('app')}>
				Retourner au calculateur{' '}
			</button>
		</div>
	)
}

export let IntegrationCode = ({ color = 'purple' }) => (
	<code
		css={`
			display: block;
			font-size: 80%;
			width: 90%;
			padding: 1em;
			background: #f8f8f8;
			margin: auto;
			margin-bottom: 1em;
			overflow: auto;
			box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05),
				-1px 1px 1px rgba(0, 0, 0, 0.02);
			em {
				font-weight: 300;
				color: black;
			}
			:before {
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				border-width: 0 16px 16px 0;
				border-style: solid;
				border-color: #e8e8e8 white;
			}
			#scriptColor {
				color: #2975d1;
			}
		`}
	>
		<span>{'<'}</span>
		<em>
			script
			<br />
			id
		</em>
		="ecolab-transport" <em>data-couleur</em>="
		<span id="scriptColor">{color}</span>" <em>src</em>
		="https://ecolab-transport.netlify.com/iframe.js">
		<span>{'<'}</span>
		<span>/</span>
		<em>script</em>
		<span>></span>
	</code>
)
