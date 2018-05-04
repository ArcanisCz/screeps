const path = require('path');

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
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [{
            test: [/\.ts$/],
            include: path.resolve(__dirname, 'src'),
            loader: 'ts-loader',
        }],
    },
});
