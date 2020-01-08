const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					// ... other loaders
					{
						loader: require.resolve('babel-loader'),
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: [
								'babel-plugin-styled-components',
								isDevelopment && require.resolve('react-refresh/babel')
							].filter(Boolean)
						}
					}
				]
			}
		]
	},
	entry: './index.js',

	output: {
		filename: 'index.js',
		path: __dirname + '/dist',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true
	},

	plugins: [
		isDevelopment &&
			new ReactRefreshWebpackPlugin({ disableRefreshCheck: true }),
		new HtmlWebpackPlugin({
			title: 'Ecolab transport',
			template: 'index.html'
		})
	].filter(Boolean)
}
