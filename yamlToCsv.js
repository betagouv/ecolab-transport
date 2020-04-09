const yaml = require('yaml')
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const fields = ['titre','gCO2e/km/personne','voyageurs', 'urbain','extra-urbain', 'source','note'];

(async function(){
	try {
			const data = await readFile('./ges-transport.yaml', 'utf8')
			const rules = yaml.parse(data)

			const lines = []
			rules.urbains.forEach(rule => {
				if(typeof rule['gCO2e/km/personne'] === 'object'){
					Object.keys(rule['gCO2e/km/personne']).forEach( k => {
						lines.push({
							titre: rule.titre + ' - ' + k,
							'gCO2e/km/personne': rule['gCO2e/km/personne'][k],
							voyageurs: undefined,
							urbain: true,
							'extra-urbain': false,
							source: rule.source,
							note: rule.note
						})
					})
				} else {
					lines.push({
						titre: rule.titre,
						'gCO2e/km/personne': rule['gCO2e/km/personne'],
						voyageurs: rule.voyageurs,
						urbain: true,
						'extra-urbain': false,
						source: rule.source,
						note: rule.note
					})
				}
			})

			rules['les deux'].forEach(rule => {
				if(typeof rule['gCO2e/km/personne'] === 'object'){
					Object.keys(rule['gCO2e/km/personne']).forEach( k => {
						lines.push({
							titre: rule.titre + ' - ' + k,
							'gCO2e/km/personne': rule['gCO2e/km/personne'][k],
							voyageurs: undefined,
							urbain: true,
							'extra-urbain': true,
							source: rule.source,
							note: rule.note
						})
					})
				} else {
					lines.push({
						titre: rule.titre,
						'gCO2e/km/personne': rule['gCO2e/km/personne'],
						voyageurs: rule.voyageurs,
						urbain: true,
						'extra-urbain': true,
						source: rule.source,
						note: rule.note
					})
				}
			})

			rules['extra-urbains'].forEach(rule => {
				if(typeof rule['gCO2e/km/personne'] === 'object'){
					Object.keys(rule['gCO2e/km/personne']).forEach( voyageurs => {
						Object.keys(rule['gCO2e/km/personne'][voyageurs]).forEach( k => {
							lines.push({
								titre: rule.titre + ' - ' + k,
								'gCO2e/km/personne': rule['gCO2e/km/personne'][voyageurs][k],
								voyageurs,
								urbain: false,
								'extra-urbain': true,
								source: rule.source,
								note: rule.note
							})
						})
					})
				} else {
					lines.push({
						titre: rule.titre,
						'gCO2e/km/personne': rule['gCO2e/km/personne'],
						voyageurs: rule.voyageurs,
						urbain: false,
						'extra-urbain': true,
						source: rule.source,
						note: rule.note
					})
				}
			})

			await writeFile('./dist/ges-transport.csv', fields.join(',') + '\n' + lines.map(line => fields.map(f => {
				// console.log(f, line[f], typeof line[f])
				if(typeof line[f] === 'boolean' || typeof line[f] === 'number') return line[f]
				else if(!line[f]) return ''
				else if(line[f].includes('"') || line[f].includes(',')) return '"' + line[f].replace(/"/g,'""') + '"'
				else return line[f]
			}).join(',')).join('\n'))
	} catch (err) {
		 console.error(err)
	}
})()
