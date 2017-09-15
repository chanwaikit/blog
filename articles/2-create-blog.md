title:用next.js搭建blog
date: 2017.09.14
---

创建一个单页Javascript应用程序是一件非常有挑战的事情, 幸运的是, 开源世界给我们提供了一些好用的工具来简化, 加速单页应用的开发.

Create React App 就是这样一种工具。

即使是这样, 创建单页应用有非常高的学习曲线. 仍然需要我们学习客户端路由, 页面布局, 等技术. 如果你还想要运行服务器端渲染(SSR: Server Side Rendering), 事情就变得更加困难了。因此我们需要一个简单的方案。

刚好前不久，next.js 出了 3.0 版本，其中一个主要的特性就是支持静态文件输出，特别适合拿来生成静态博客。

使用Next.js框架给我们提供了以下能力。
- 服务器端渲染(默认)
- 自动代码切分, 加速页面加载
- 简单的客户端路由(基于页面)
- 基于Webpack的开发环境, 支持热模块替换(HMR: Hot Module Replacement)
- 可以使用Express 或其他Node.js服务器实现
- 使用Babel和Webpack配置定制

关于[Next.js文档](https://github.com/zeit/next.js)的一些基础内容
- 所有的.js文件会自动处理和渲染，并形成路由。
- 服务器渲染索引根目录下的 ./pages 文件夹
- 静态文件放在./static/中对应路由的/static/   例如 img src="/static/my-image.png" 
- 暴露<head>供组件里头设置，在<head>里头可以设置title等等
- 我们能在顶级组件中的getInitialProps({pathname,query,asPath,req,res,jsonPageRes})获取到相应信息。query在服务器上配置自定义路由时很有用
- 自定义路由 const app = require('next')({process.env.NODE_ENV !== 'production'}); app.render()里可将query自定义的obj传进来供getInitialProps传进来供其使用。
- 支持动态导入 Dynamic Import
- 自定义document，加载./pages的_document.js文件。用来改写 <html>，<body> 的默认行为
- next.config.js可设置静态html导出 

在[next-go项目](https://github.com/timberio/next-go/)的基础上做了一些修改。
- 去掉了next-router,用express的路由配置来代替
- 去掉了从服务端fetch data，构建纯静态blog
- 将fetch data 部分使用markdown 静态文件转html 来实现

先看next.config.js的静态导出配置，下面代码是next.js文档提供的方法。
```js
// next.config.js
module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } }
    }
  }
}
```
这就相当于写死了，当我每加一个页面（发一篇文章）我就得在这里配置一下路由，然而我并不想这么做。

```js
const readArticles = require("./lib/readArticles");

module.exports = {
	async exportPathMap() {
		const files = await readArticles();
		const pages = files.reduce(
			(pages, file) =>
				Object.assign({}, pages, {
					[file.link]: {
						page: "/post",
						query: { content: file.result }
					}
				}),
			{}
		);

		return Object.assign({}, pages, {
			"/": {
				page: "/",
				query: {
					articles: files.map(item => ({
						link: item.link,
						title: item.title
					}))
				}
			}
		});
	}
};
```
于是就得动态生成路由，readArticles里头用到了fs，这里封装了一层，可以将本地的你想要的文件读出来得到数组，每一项就是处理后md生成的对象（包括title，date，content什么的），再通过query对象可以传到./pages/post.js，在组件中 `getInitialProps`方法里头接收，再通过showdown.Converter()将其转成html，使用dangerouslySetInnerHTML={{ __html: query.content }}成功转成页面。

接着看，我将next-go项目里的next-router去掉了，因为传参的原因，用它的router进行传参，他会将参数拼接到url后面。于是我用a标签替代路由跳转的动作，并且用express做了处理。

```js
const files = await readArticles();
const server = express();
const app = next();

server.get("/post/:name", (req, res) => {
    const file = files.find(item => item.link === req.path);
    return app.render(req, res, "/post", {
        content: file.result
    });
});
```

item.link 实际上是一个'post/hello-world' 类似的东西，这里将它转一下，实际上访问的是/post，同理在query传参。

blog基本搭起来了，但是懂得东西还是比较浅的。接下来还需学习更多做进一步的开发。



参考资料
- [Next.js的文档](https://github.com/zeit/next.js)
- [https://learnnextjs.com/basics/getting-started](https://learnnextjs.com/basics/getting-started)
- [https://github.com/timberio/next-go/](https://github.com/timberio/next-go/)
- [https://github.com/clinyong/blog](https://github.com/clinyong/blog)

