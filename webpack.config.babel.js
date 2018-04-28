const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const array = (...target) => target.filter(Boolean);

module.exports.default = ({dev}) => ({
    entry: {
        main: "./src/index.js",
    },
    target: 'node',
    devtool: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: false,
    },
    plugins: array(
        // new webpack.DefinePlugin({
        //     VERSION: JSON.stringify(gitRevisionPlugin.version()),
        // }),
        dev && new webpack.NamedModulesPlugin(),
        // new BundleAnalyzerPlugin(),
    ),
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
        }],
    },
});
