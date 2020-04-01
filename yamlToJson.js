let yaml = require('yaml')
let fs = require('fs')
fs.readFile('./ges-transport.yaml', 'utf8', (err, data) => {
	if (err) console.error(err)
	let rules = yaml.parse(data)

	fs.writeFile('./dist/ges-transport.json', JSON.stringify(rules), function (
		err
	) {
		if (err) return console.error(err)
		console.log('Les règles en JSON ont été écrites avec succès, bravo !')
	})
})
