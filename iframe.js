import { iframeResizer } from 'iframe-resizer'

const script = document.getElementById('ecolab-transport'),
	couleur = encodeURIComponent(script.dataset.couleur),
	integratorUrl = encodeURIComponent(window.location.href.toString()),
	tmp = document.createElement('a')

tmp.href = script.src
const src = `https://${tmp.hostname}?couleur=${couleur}&iframe&integratorUrl=${integratorUrl}`

const iframe = document.createElement('iframe')

const iframeAttributes = {
	src,
	style:
		'border: none; width: 100%; display: block; margin: 10px auto; min-height: 700px',
	allowfullscreen: true,
	webkitallowfullscreen: true,
	mozallowfullscreen: true
}
for (var key in iframeAttributes) {
	iframe.setAttribute(key, iframeAttributes[key])
}
iframeResizer(
	{
		interval: 0,
		scrolling: 'auto',
		heightCalculationMethod: 'lowestElement'
	},
	iframe
)

script.parentNode.insertBefore(iframe, script)

/* In case we want to add links outside of the iframe for SEO purposes 
 *
const links = document.createElement('div')
const moduleToSitePath = {
	'simulateur-embauche': '/simulateurs/salarié',
	'simulateur-autoentrepreneur': '/simulateurs/auto-entrepreneur',
	'simulateur-independant': '/simulateurs/indépendant',
	'simulateur-assimilesalarie': '/simulateurs/assimilé-salarié'
}
const simulateurLink = (fr ? process.env.FR_SITE : process.env.EN_SITE).replace(
	'${path}',
	moduleToSitePath[moduleName]
)
links.innerHTML = `
		<div style="text-align: center; margin-bottom: 2rem">
						<a href="${simulateurLink}" target="_blank">
								<img
								style="height: 2.5rem; margin-right: 1rem"
								src="${process.env.FR_SITE.replace(
									'${path}',
									'/' + (lang === 'fr' ? logoFrSvg : logoEnSvg)
								)}"
								alt="mon-entreprise.fr : l'assistant officiel du créateur d'entreprise"
						/>
						</a>
						<a href="https://www.urssaf.fr" target="_blank">
								<img
								style="height: 2.5rem; margin-right: 1rem"
								src="${process.env.FR_SITE.replace('${path}', '/' + urssafSvg)}"
								alt="un service fourni par l'Urssaf"
						/>
						</a>
						<a href="https://beta.gouv.fr" target="_blank">
								<img
								style="height: 2.5rem"
								src="${process.env.FR_SITE.replace('${path}', '/' + marianneSvg)}"
								alt="incubé par beta.gouv.fr (direction du numérique)"
						/>
						</a>
				</div>
		`

script.parentNode.insertBefore(links, script)
*/
