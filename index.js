import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Integration from './Integration'

const Index = ({}) => {
	const [router, setRouter] = useState('app')

	return router === 'app' ? (
		<App setRouter={setRouter} />
	) : (
		<Integration setRouter={setRouter} />
	)
}

ReactDOM.render(<Index />, document.getElementById('app'))
