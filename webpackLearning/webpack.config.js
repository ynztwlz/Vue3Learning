const path = require('path') //导入 node.js 中专门操作路径的模块
//1. 导入HTML插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()
//2. 创建HTML插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', //指定原文件的存放路径
    filename: './index.html' //指定生成的文件的存放路径
})

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.join(__dirname, './src/index.js'), //打包入口文件的路径
    output: {
        path: path.join(__dirname, './dist'), //输出文件的存放路径
        filename: 'js/bundle.js' //输出文件的名称
    },
    plugins: [htmlPlugin, cleanPlugin], //3.通过plugins节点，使htmlPlugin插件生效
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 80
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            //{test: /\.jpg|png|gif$/, use: 'url-loader?limit=22229'},
            {
                test: /\.jpg|png|gif$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 22229,
                        outputPath: 'image',
                    }
                }
            },
            {
                test: /\.js$/,
                //exclude为排除项
                //表示bbabel-loader只需处理开发者编写的js文件，不需要处理node_modules下的js文件
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //参数项
                        //声明一个babel插件，此差价用来转化class中得到高级语法
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            }
        ]
    }
}