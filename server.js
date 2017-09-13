const express = require('express')
const next = require('next')
const routes = require('./routes')
const readArticles = require("./lib/readArticles");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const handler = routes.getRequestHandler(app)



async function start() {
	await app.prepare();
  	const server = express()
  	const files = await readArticles();

 	 // server.use(handler)

 	// server.get('*', (req, res) => {
  //   	return handle(req, res)
  //   })

server.get("/post/:name", (req, res) => {
		const file = files.find(item => item.link === req.path);
		return app.render(req, res, "/post", {
			content: file.content,
			title: file.title,
		});
	});

	server.get("*", (req, res) => {
		return app.render(req, res, "/", {
			articles: files.map(item => ({
				link: item.link,
				title: item.title,
				date:item.date,
				result:item.result,
				fileName:item.fileName
			}))
		});
	});


	


  server.listen(5000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:5000')
  })
}


start()