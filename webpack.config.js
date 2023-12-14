const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

let nowDate = Date.now();

module.exports = {
    entry: {
        js: './public/index.js',
        style: './assets/css/zoomNdrag.css',
    },
    output: {
        path: __dirname,
        filename: './dist/[name]_bundle_' + nowDate + '.js',
        library: 'zoomNdrag'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./dist/[name]_bundle_" + nowDate + ".css",
        }),
        new RemovePlugin ({
            after: {
                include: ["./dist/style_bundle_" + nowDate + ".js"]
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ],
    },
    mode: 'production',
};