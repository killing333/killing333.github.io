var webpack = require( "webpack" );
const path = require( 'path' );

module.exports = {
	mode: 'development',
	entry: {
		main: './src/main.js',
		resume: './src/resume.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve( __dirname, 'dist', 'js' )
	},
	externals: {
		jquery: 'jQuery'
	}
};
