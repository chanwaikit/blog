const path = require('path')
const readArticles = require("./lib/readArticles");
module.exports = {
  async exportPathMap() {
    const files = await readArticles();
    const pages = files.reduce(
      (pages, file) =>
        Object.assign({}, pages, {
          [file.link]: {
            page: "/post",
            query: {
              title: file.title,
              content: file.result.content, 
              articles: files.map(item => ({
              link: item.link,
              title: item.title,
              date: item.date,
              result: item.result,
              fileName: item.fileName
          }))
            }
          }
        }),
      {}
    );

    return Object.assign({}, pages, {
      "/about": {
        page: "/about"
      },
      "/contact": {
        page: "/contact"
      },
      "/": {
        page: "/",
        query: {
          articles: files.map(item => ({
            link: item.link,
            title: item.title,
            date: item.date,
            result: item.result,
            fileName: item.fileName
          }))
        }
      }
    });
  }
}
