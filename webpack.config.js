var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var BuildDesignPlugin = require('./lib/build_design_plugin')

var distPath = path.resolve('./mms-components-ld')

module.exports = {
    context: __dirname,
    devtool: 'nosources-source-map',
    entry: {
        components: './source/config.json'
    },
    output: {
        path: distPath,
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin([distPath]),
        new BuildDesignPlugin({
            src: path.resolve('./source'),
            dest: distPath
        }),
        new CopyWebpackPlugin([
                {
                    context: 'source',
                    from: 'assets/@(css)/**',
                    to: path.resolve('./mms-components-ld')
                }
            ]
        ),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true, warnings: true, minimize: true})
    ]
}