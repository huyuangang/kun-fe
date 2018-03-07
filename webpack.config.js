
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        'login': path.resolve(__dirname, './app/entrys/login.js')
    },
    output: {
        path: path.resolve(__dirname, './app/output'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' }
                ],
                exclude: /node_module/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_module/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }, 
    devServer: {
        hot: true,
        contentBase: [path.resolve(__dirname, './app/pages'), path.resolve(__dirname, './app/output')],
        publicPath: "/public",
        port: 3000,
        historyApiFallback: true
        // proxy: {    //代理后台api服务器
        //     '/': {
        //         target: 'http://127.0.0.1:8081',
        //         secure: false
        //     }
        // }
    },
}