const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');




// Further configurations
const parts = require('./libs/parts');


const PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'vendor','pure.css'),
        path.join(__dirname, 'app', 'main.css')
    ],
    build: path.join(__dirname, 'build')
};

const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        app: PATHS.app,
        style: PATHS.style
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'CREST App'
        })
    ]
};

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            {
                devtool: 'source-map'
            },
            parts.minify(),
            parts.extractCSS(PATHS.style)

        );
        break;
    default:
        config = merge(
            common, {
                devtool: 'eval-source-map'
            },
            parts.setupCSS(PATHS.style),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}


validate(common);
module.exports = config;
