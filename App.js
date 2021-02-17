import React, { useState } from 'react'
import logoAdeme from './ademe.png'
import logoEcolab from './ecolab.png'
import modes from './ges-transport.yaml'
import Classement from './Classement'
import Input from './Input'
import { facteur, facteurValue } from './calcul'

console.log(
	"modes n'ayant de pas de bornes min et max définies",
	modes.filter((mode) => !mode.bornes).map((mode) => mode.titre)
)

const urlParams = new URLSearchParams(window.location.search)
const distanceInitiale = urlParams.get('distanceInitiale')

export default ({ setRouter }) => {
	const [distance, setDistance] = useState(+distanceInitiale || 10)
	const [options, setOptions] = useState({})

	const classement = modes
			.filter(({ bornes }) => {
				if (!bornes) return true
				const min = bornes.split('à partir de ')
				const max = bornes.split("jusqu'à ")
				if (min.length > 1 && max.length > 1)
					throw Error('Pas implémenté encore')
				if (min.length > 1) {
					return distance >= +min[1].split('km')[0]
				}
				if (max.length > 1) {
					return distance <= +max[1].split('km')[0]
				}
			})
			.sort(
				(m1, m2) =>
					facteurValue(distance, m1, options) -
					facteurValue(distance, m2, options)
			),
		empreinteMaximum =
			distance *
			facteurValue(distance, classement[classement.length - 1], options)

	return (
		<div
			css={`
				padding: 0.6rem 1rem 2rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				ul {
					padding: 0;
				}
				h1 {
					font-size: 160%;
					margin: 0.5rem;
					text-align: center;
				}

				h1 em {
					color: purple;
					font-style: normal;
				}

				header {
					margin-bottom: 0.1rem;
				}
			`}
		>
			<header>
				<div
					css={`
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 1rem;
					`}
				>
					<a href="https://ecolab.ademe.fr" target="_blank">
						<svg
							style={{ marginRight: '1rem', height: '6vh', display: 'block' }}
							width="109"
							height="55"
							viewBox="0 0 109 55"
							fill="none"
						>
							<path d="M0 0H54.45V54.45H0V0Z" fill="white" />
							<path d="M54.45 0H108.9V54.45H54.45V0Z" fill="#1FC58E" />
							<path
								d="M72.3154 42.3988C71.3229 42.3988 70.4818 42.281 69.7921 42.0455C69.1192 41.81 68.5472 41.524 68.0762 41.1876C67.6051 40.8511 67.1846 40.5315 66.8145 40.2287L68.8836 37.8063C69.2706 38.1595 69.7164 38.496 70.221 38.8156C70.7425 39.1521 71.4238 39.3203 72.265 39.3203C73.1061 39.3203 73.8379 39.1016 74.4603 38.6642C75.0995 38.2436 75.4192 37.6212 75.4192 36.7969V35.2324C75.0995 35.7539 74.6033 36.2081 73.9304 36.595C73.2575 36.9651 72.3827 37.1502 71.3061 37.1502C70.3135 37.1502 69.3883 36.8979 68.5304 36.3932C67.6892 35.8717 67.0164 35.1736 66.5117 34.2988C66.007 33.4072 65.7547 32.3979 65.7547 31.2707C65.7547 30.11 66.0238 29.0838 66.5621 28.1922C67.1005 27.2838 67.7986 26.5689 68.6565 26.0474C69.5145 25.5259 70.4229 25.2651 71.3818 25.2651C72.3407 25.2651 73.165 25.4081 73.8547 25.6941C74.5612 25.9633 75.0827 26.2913 75.4192 26.6782L75.6967 25.8203H78.9519V36.8474C78.9519 37.924 78.6491 38.8745 78.0435 39.6988C77.4379 40.5399 76.6304 41.196 75.621 41.667C74.6285 42.1549 73.5266 42.3988 72.3154 42.3988ZM69.3126 31.1698C69.3126 32.0446 69.607 32.7848 70.1958 33.3904C70.7846 33.9792 71.5079 34.2736 72.3659 34.2736C73.779 34.2736 74.7967 33.7184 75.4192 32.6081V29.9081C75.1836 29.3698 74.7967 28.9408 74.2584 28.6212C73.7201 28.3016 73.0893 28.1418 72.3659 28.1418C71.5079 28.1418 70.7846 28.4278 70.1958 28.9997C69.607 29.5549 69.3126 30.2782 69.3126 31.1698Z"
								fill="white"
							/>
							<path
								d="M82.5808 25.8203H86.1135V36.8474H82.5808V25.8203ZM82.5051 21.9091C82.5051 21.3876 82.707 20.9586 83.1107 20.6221C83.5313 20.2857 83.977 20.1175 84.4481 20.1175C84.9191 20.1175 85.3481 20.2857 85.735 20.6221C86.1387 20.9586 86.3406 21.3876 86.3406 21.9091C86.3406 22.4306 86.1387 22.8595 85.735 23.196C85.3481 23.5156 84.9191 23.6754 84.4481 23.6754C83.977 23.6754 83.5313 23.5156 83.1107 23.196C82.707 22.8595 82.5051 22.4306 82.5051 21.9091Z"
								fill="white"
							/>
							<path
								d="M92.9311 25.8203L93.2087 28.3436C93.5283 27.7044 93.9657 27.1577 94.5208 26.7035C95.076 26.2324 95.6227 25.8792 96.161 25.6436C96.6993 25.3913 97.1115 25.2651 97.3975 25.2651L97.2208 28.7978C96.3965 28.6969 95.69 28.8315 95.1012 29.2016C94.5124 29.5717 94.0582 30.0595 93.7386 30.6651C93.419 31.2707 93.2592 31.8932 93.2592 32.5324V36.8474H89.7517V25.8203H92.9311Z"
								fill="white"
							/>
							<path
								d="M9.23546 37.1502C8.20929 37.1502 7.29247 36.9147 6.48499 36.4436C5.67751 35.9558 5.03826 35.2576 4.56723 34.3492C4.11303 33.4408 3.88593 32.3642 3.88593 31.1193C3.88593 29.8745 4.13826 28.8147 4.64293 27.9399C5.14761 27.0651 5.83733 26.4006 6.71209 25.9464C7.58686 25.4922 8.57939 25.2651 9.68967 25.2651C10.3962 25.2651 11.0691 25.3745 11.7084 25.5932C12.3644 25.8118 12.9112 26.1483 13.3485 26.6025V16.938H16.856V36.8474H13.3233V35.6866C12.785 36.1072 12.1794 36.4604 11.5065 36.7464C10.8336 37.0156 10.0766 37.1502 9.23546 37.1502ZM10.3962 34.1726C11.1028 34.1726 11.6915 34.038 12.1626 33.7689C12.6336 33.4829 13.0205 33.0623 13.3233 32.5072V29.8072C13.1214 29.2689 12.7598 28.8399 12.2383 28.5203C11.7168 28.2006 11.1028 28.0408 10.3962 28.0408C9.87471 28.0408 9.38686 28.1754 8.93266 28.4446C8.49527 28.6969 8.142 29.0502 7.87284 29.5044C7.60368 29.9586 7.4691 30.4801 7.4691 31.0689C7.4691 31.6576 7.60368 32.1875 7.87284 32.6586C8.142 33.1296 8.49527 33.4997 8.93266 33.7689C9.38686 34.038 9.87471 34.1726 10.3962 34.1726Z"
								fill="#1FC58E"
							/>
							<path
								d="M25.1333 37.1502C24.1071 37.1502 23.1734 36.9483 22.3323 36.5446C21.508 36.124 20.8519 35.4847 20.3641 34.6268C19.8762 33.7689 19.6323 32.6754 19.6323 31.3464C19.6323 30.1016 19.8847 29.0249 20.3893 28.1165C20.894 27.2081 21.5585 26.51 22.3828 26.0221C23.2071 25.5175 24.0819 25.2651 25.0071 25.2651C26.1005 25.2651 26.9248 25.4418 27.48 25.795C28.052 26.1483 28.5062 26.5352 28.8426 26.9558L29.0697 25.8203H32.3501V36.8474H28.8174V35.4847C28.6491 35.653 28.3968 35.8717 28.0604 36.1408C27.7407 36.41 27.337 36.6455 26.8491 36.8474C26.3613 37.0492 25.7893 37.1502 25.1333 37.1502ZM26.1426 34.2735C27.3706 34.2735 28.2622 33.7184 28.8174 32.6081V29.9081C28.6155 29.3698 28.2622 28.9408 27.7576 28.6212C27.2697 28.3016 26.6893 28.1418 26.0164 28.1418C25.2594 28.1418 24.6033 28.4277 24.0482 28.9997C23.4931 29.5548 23.2155 30.2782 23.2155 31.1698C23.2155 31.7586 23.3501 32.2885 23.6192 32.7595C23.8884 33.2305 24.2417 33.6006 24.6791 33.8698C25.1333 34.139 25.6211 34.2735 26.1426 34.2735Z"
								fill="#1FC58E"
							/>
							<path
								d="M37.0248 20.9754H40.5575V25.7698H43.2323V28.5203H40.5575V36.8474H37.0248V28.5203H35.3089V25.7698H37.0248V20.9754Z"
								fill="#1FC58E"
							/>
							<path
								d="M44.6089 36.8474L54.45 13.8848L64.2911 36.8474H61.0108L54.45 20.6978L47.6369 36.8474H44.6089Z"
								fill="white"
							/>
							<path
								d="M44.6089 36.8474L54.45 13.8848V20.6978L47.7631 36.8474H44.6089Z"
								fill="#1FC58E"
							/>
						</svg>
					</a>
					<img css="height: 6vh" src={logoAdeme} />
				</div>
				<h1 css="position: relative">
					Votre impact <em>climat</em>
					<VersionBeta />
				</h1>
			</header>
			<Input {...{ distance, setDistance, modes }} />
			<Classement
				{...{
					classement,
					options,
					setOptions,
					distance,
					empreinteMaximum,
				}}
			/>
			<div css="text-align: center">
				<button css="margin: 1rem" onClick={() => setRouter('integration')}>
					Intégrez ce calculateur sur votre site{' '}
				</button>
				<NousContacer />
			</div>
		</div>
	)
}

const VersionBeta = () => (
	<span
		css={`
			display: inline-block;
			width: 2.2rem;
			background: #83a7c9;
			padding: 0 0.2rem;
			font-size: 45%;
			text-align: center;
			color: white;
			border-radius: 0.6rem;
			margin: 0 0.3rem;
			font-weight: 900;
			position: absolute;
			right: -2.6rem;
			transform: rotate(35deg);
		`}
	>
		beta
	</span>
)

const NousContacer = () => (
	<div css="max-width: 30rem; text-align: center">
		Une question, une suggestion ?{' '}
		<a href="https://airtable.com/shr0MkHMKnpkWil7F" target="_blank">
			Faites-nous part de vos retours !
		</a>
	</div>
)
