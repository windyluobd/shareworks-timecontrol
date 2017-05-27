var glob = require('glob');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var getEntry = function() {
	var entryFiles = [];
	glob.sync("./src/js/**/*.js") .forEach(function(jsPath) {
		entryFiles.push(jsPath);
	});
	return entryFiles;
};

module.exports = {
    entry: {
		"main": getEntry()
	},
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
				exclude: /node_modules/,
                loader: 'babel-loader',
				query: {presets: ['es2015']}
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
	plugins: [
		new CopyWebpackPlugin([
			{from: __dirname + '/src/css/wp_icons.png', to: __dirname + '/dist/css'},
			{from: __dirname + '/src/css/wp_icons_light.png', to: __dirname + '/dist/css'}
		])		
	]
	
};