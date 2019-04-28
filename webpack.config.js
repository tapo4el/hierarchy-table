const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const data = require('./data.json');

module.exports = (env, argv) => ({
    entry: ['babel-polyfill', './src/index.tsx'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: argv.mode === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
            { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
    output: {
        path: path.resolve(__dirname, 'public/'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/',
        hotOnly: true,
        before(app) {
            app.get('/data', (req, res) => {
                res.json(data);
            });
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({ filename: 'bundle.css' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
});
