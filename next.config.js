const path = require('path')
const readArticles = require("./lib/readArticles");
module.exports = {
  webpack: (config, { dev }) => {
    // Perform customizations to webpack config

    // Important: return the modified config
    // config.resolve.modules = [path.resolve(__dirname, "components"), "node_modules"]
    return config
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  },
  async exportPathMap() {
    const files = await readArticles();
    const pages = files.reduce(
      (pages, file) =>
        Object.assign({}, pages, {
          [file.link]: {
            page: "/post",
            query: { content: file.result.content }
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
}
