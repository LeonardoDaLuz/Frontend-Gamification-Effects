const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i, //para o style loader funcionar.
                use: [
                    'style-loader', //essa regra se aplica ao style-loader e css-loader
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
        ]
    }

    ,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: "./src/imgs/", to: "./imgs/" },
            ],
          }),
    ]
}