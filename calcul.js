// Calcul du facteur d'émission d'un mode de transport du fichier modes.yaml
export default (distance, m, { voyageurs, propulsion } = {}) => {
	const parPersonne = m['gCO2e/km/personne']

	if (m.titre.includes('voiture')) {
		const parVoiture = m.voyageurs * parPersonne
		return parVoiture / (voyageurs || m.voyageurs)
	}

	if (m.titre === 'TER') {
		return parPersonne[propulsion || 'moyenne']
	}
	if (
		['bus thermique', 'tram ou trolleybus', 'ferry', 'TER'].includes(m.titre)
	) {
		/* Once the inhabitants and other variables are known :
				return Object.entries(parPersonne).find(
					([intervalle]) => dansIntervalle
				)[1]

				*/
		const valeurs = Object.values(parPersonne)
		return valeurs.reduce((memo, next) => memo + next, 0) / valeurs.length
	}
	if (m.titre === 'avion') {
		let chiffresPertinents = Object.values(parPersonne)
			.map(intervalles =>
				Object.entries(intervalles).find(([intervalle]) =>
					dansIntervalle(distance, intervalle, 'km')
				)
			)
			.filter(Boolean)
		return (
			chiffresPertinents.reduce((memo, [, next]) => memo + next, 0) /
			chiffresPertinents.length
		)
	}
	return parPersonne
}
const dansIntervalle = (distance, intervalle, unité) => {
	const de = +intervalle.split('-')[0],
		àRaw = intervalle.split('-')[1].split(' ' + unité)[0],
		à = àRaw === '∞' ? Infinity : +àRaw

	return distance > de && distance <= à
}
