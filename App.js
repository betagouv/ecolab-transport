import React from 'react'
import logoAdeme from './ademe.jpg'
import logoEcolab from './ecolab.png'
import Calculateur from './Calculateur'

export default () => {
	const path = decodeURI(window.location.pathname)

	if (path === '/') return <Home />
	if (path === '/calculateur') return <Calculateur />
	if (path === '/inversé') return <div>Calculateur inversé à venir</div>

	return <div>404, chemin inconnu : {path}</div>
}

const Home = () => (
	<header>
		<div css="max-width: 30rem; text-align: center">
			Ce calculateur est une
			<span css="display: inline-block; width: 6rem;background: purple; padding: 0 .2rem; font-size: 90%; text-align: center; color: white; border-radius: .6rem; margin: 0 .3rem; font-weight: 900">
				version test
			</span>
			<br />
			Une question, une suggestion ?{' '}
			<a href="https://airtable.com/shr0MkHMKnpkWil7F">
				Faites-nous part de vos retours !
			</a>
		</div>
		<div
			css={`
				display: flex;
				justify-content: center;
				align-items: center;
			`}
		>
			{/* && <img css="height: 6vh" src={logoAdeme} /> */}
			<a href="https://ecolab.ademe.fr">
				<img css="height: 5vh" src={logoEcolab} />
			</a>
		</div>
		<h1>Impact climat</h1>
		<ul>
			<li>
				<a href="/calculateur">
					Quel est l'impact climat d'un km en vélo, voiture, avion...
				</a>
			</li>
			<li>
				<a href="/inversé">
					Combien de km parcourir en vélo, voiture, avion...
				</a>
			</li>
		</ul>
	</header>
)
