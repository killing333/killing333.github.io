var path = require( 'path' );
var webpack = require( 'webpack' );

module.exports = {
	module: {
		loaders: [ {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		} ]
	},
	entry: './js/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve( __dirname, 'dist' )
	},
	resolve: {
		alias: {
			js: path.resolve( __dirname, './js' ),
			components: path.resolve( __dirname, './components' )
		}
	},
	plugins: [
		new webpack.ProvidePlugin( {
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		} )
	]
};
