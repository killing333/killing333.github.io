var webpack = require( "webpack" );
const path = require( 'path' );

module.exports = {
	entry: {
		main: './src/main.js',
		resume: './src/resume.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve( __dirname, 'dist', 'js' )
	},
	module: {
		loaders: [ {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		} ]
	},
	plugins: [
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery'
		} )
	]
};
