const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const CopyPlugin = require('copy-webpack-plugin')

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
			},
			{
				test: /\.(jpe?g|png|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]'
					}
				}
			},
			{
				test: /\.yaml$/,
				use: 'js-yaml-loader'
			}
		]
	},
	entry: {
		index: './index.js',
		iframe: './iframe.js'
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true
	},

	plugins: [
		isDevelopment &&
			new ReactRefreshWebpackPlugin({ disableRefreshCheck: true }),
		new CopyPlugin(['iframeResizer.contentWindow.min.js']),
		new HtmlWebpackPlugin({
			title: 'Ecolab transport',
			chunks: ['index'],
			template: 'index.html'
		})
	].filter(Boolean)
}
