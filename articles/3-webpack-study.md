title: 学习webpack
date: 2017.09.18
---

对webpack还是比较恐惧的，目前对webpack了解甚浅，会逐渐更新
```js
//在node加载文件的时候，会传入exports,module,__filename,__dirname，在作用域的顶端接收存储变量


 const path = require('path'); //node.js 内置的package 用来处理路径的
 const HtmlWebpackPlugin = require('html-webpack-plugin'); 
 //默认生成html，HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
 const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist 重新打包，这样就可防止每次都生成一个新的bunble.xxxx.js
 const CopyWebpackPlugin = require('copy-webpack-plugin');//静态文件copy到dist
 const webpack = require('webpack');


  module.exports = {
    devtool: 'inline-source-map', //调试，跟踪报错
  	devServer: { //修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：
     	contentBase: './dist'，
     	hot:true
   	},
    entry: {
      // index: './src/index.js',
      app: './src/index.js',
      print: './src/print.js',
      vendor: [ //将公用的 用CommonsChunkPlugin生成，减少向服务器获取资源（缓存）
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
      ],
    },
    output: {
      //filename: 'bundle.js', //打包后的文件名
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),  //你要输出的路径，resolve：将 to 参数解析为绝对路径,join:拼接url。
      //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
      //publicPath: "/assets/" 打包后，文件会放到dist/assets/里头
    },
    module: {
     rules: [
       {
         test: /\.css$/, //webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，
         //在你对它打包之前，先使用 raw-loader 转换一下。”
         use: [  //这使你可以在依赖于此样式的文件中 import './style.css'。现在，当该模块运行时，含有 CSS 字符串的 <style> 标签，
         //将被插入到 html 文件的 <head> 中
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader' //使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中：
         ]
       }
     ]
   },
   plugins: [
	   new CleanWebpackPlugin(['dist']), //清理dist,
       new webpack.DefinePlugin({ //定义变量，可在脚本里头使用，
       	//即可在我们的代码里头可获取 process.env.NODE_ENV 执行webpack.config.js时候，
       	//它等于production
        'process.env.NODE_ENV': '"production"'
       }),
       new webpack.optimize.UglifyJsPlugin({ //简化js，压缩吧
          minimize: true,
          compress: {
          warnings: false,
        },
       }),
       new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js'),  //防止重复，生成公共的bundle
       new CopyWebpackPlugin([{
    	  from: __dirname + '/assets',
          to: __dirname + '/dist/assets'
	   }]),
	   new CleanWebpackPlugin(['dist']),
       new webpack.HotModuleReplacementPlugin(),//webpack 内置的HMR 插件 模块热加载
       new HtmlWebpackPlugin({
       		title: 'Output Management'
     	 })
   ]
  };
```