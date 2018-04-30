const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports.default = ({
    entry: {
        main: "./src/main.ts",
    },
    target: 'node',
    node: {
        console: true,
        global: true,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    devtool: false,
    output: {
        path: "C:\\Users\\arcan\\AppData\\Local\\Screeps\\scripts\\127_0_0_1___21025\\default",
        filename: "./main.js",
        pathinfo: true,
        libraryTarget: "commonjs2",
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
        })
    ],
    resolve: {
        extensions: ['.ts', '.d.ts']
    },
    module: {
        rules: [{
            test: [/\.ts$/, /\.js$/],
            include: path.resolve(__dirname, 'src'),
            loader: 'ts-loader',
        }],
    },
});
