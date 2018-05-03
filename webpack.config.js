
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        'index': path.resolve(__dirname, './app/entrys/index.js'),
        'login': path.resolve(__dirname, './app/entrys/login.js'),
        'regist': path.resolve(__dirname, './app/entrys/regist.js'),
        'task': path.resolve(__dirname, './app/entrys/task.js'),
        'taskDetail': path.resolve(__dirname, './app/entrys/taskDetail.js'),
        'vuln': path.resolve(__dirname, './app/entrys/vuln.js'),
        'plugin': path.resolve(__dirname, './app/entrys/plugin.js')
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
            'vue$': 'vue/dist/vue.js',
            'bootstrap$': '_bootstrap@4.1.0@bootstrap/dist/css/bootstrap.min.css'
        }
    }, 
    devServer: {
        hot: true,
        contentBase: [path.resolve(__dirname, './app/pages'), 
                      path.resolve(__dirname, './app/output'),
                      path.resolve(__dirname, './app/common/icons')],
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