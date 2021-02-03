import React, { useEffect } from 'react'

const src = 'https://datagir.ademe.fr/apps/transport/iframe.js'
export default ({ setRouter }) => {
	useEffect(() => {
		const script = document.createElement('script')

		script.src = src
		script.id = 'ecolab-transport'
		script.dataset.couleur = 'purple'
		script.dataset.distanceInitiale = '29'

		document.querySelector('#app').appendChild(script)

		return () => {
			document.querySelector('#app').removeChild(script)
		}
	}, [])

	return (
		<div>
			<button onClick={() => setRouter('app')}>
				Retourner au calculateur{' '}
			</button>
			<h1>Le module de calcul chez vous</h1>
			<p>
				Intégrez notre module de calcul chez vous, par exemple rendre un article
				de blog plus intéractif pour le lecteur, simplement en ajoutant cette
				ligne à votre page Web :
			</p>
			<IntegrationCode />
			<h2>Exemple</h2>
			<p>Voici ce que donne l'intégration :</p>
		</div>
	)
}

export let IntegrationCode = () => (
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
			.attribute {
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
		="ecolab-transport" <em>data-distanceInitiale</em>="
		<span className="attribute">29</span>" <em>src</em>="{src}">
		<span>{'<'}</span>
		<span>/</span>
		<em>script</em>
		<span>></span>
	</code>
)
