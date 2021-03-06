const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const CopyPlugin = require('copy-webpack-plugin')

// If on master, with a URL_PATH env (used by the yarn build commmand)
// inject a base path, since the website is used from ecolab.ademe.fr/apps/transport/
//
// Only for the master branch, to enable netlify branch reviews to work
const prodPath = process.env.BRANCH === 'master' && process.env.URL_PATH

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
								isDevelopment && require.resolve('react-refresh/babel'),
							].filter(Boolean),
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]',
					},
				},
			},
			{
				test: /\.yaml$/,
				use: 'js-yaml-loader',
			},
		],
	},
	entry: {
		index: './index.js',
		iframe: './iframe.js',
	},
	output: {
		path: __dirname + '/dist',
		publicPath: prodPath || '/',
	},
	devServer: {
		historyApiFallback: true,
	},

	plugins: [
		isDevelopment && new ReactRefreshWebpackPlugin(),
		new CopyPlugin(['iframeResizer.contentWindow.min.js']),
		new HtmlWebpackPlugin({
			title: 'Ecolab transport',
			chunks: ['index'],
			template: 'index.html',
			...(prodPath ? { base: prodPath } : {}),
		}),
	].filter(Boolean),
}
