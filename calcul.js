// Calcul du facteur d'émission d'un mode de transport du fichier ges-transport.yaml
export const facteur = (distance, m, { voyageurs, propulsion } = {}) => {
	const parPersonne = m['gCO2e/km/personne']

	if (m.titre.includes('voiture')) {
		const parVéhicule = m['gCO2e/km/véhicule']
		if (parVéhicule) return parVéhicule / (voyageurs || m.voyageurs)

		// Nous avions précédemment des données / voyageur
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
		let intervalle = Object.keys(parPersonne)
			// Ignore the number of seats, it's not handled yet
			.find((intervalle) => dansIntervalle(distance, intervalle, 'km'))
		const data = parPersonne[intervalle],
			value = data['avec trainées'] // We choose the total number

		// but return both the total number and the decomposition
		return { value, more: data }
	}
	return parPersonne
}
const dansIntervalle = (distance, intervalle, unité) => {
	const de = +intervalle.split('-')[0],
		àRaw = intervalle.split('-')[1].split(' ' + unité)[0],
		à = àRaw === '∞' ? Infinity : +àRaw

	return distance > de && distance <= à
}

export const facteurValue = (distance, m, options) => {
	const data = facteur(distance, m, options)

	return typeof data === 'object' ? data.value : data
}
