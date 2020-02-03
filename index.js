import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Integration from './Integration'

const Index = ({}) => {
	const [router, setRouter] = useState('app')

	return {
		app: <App setRouter={setRouter} />,
		integration: <Integration setRouter={setRouter} />
	}[router]
}

ReactDOM.render(<Index />, document.getElementById('app'))
