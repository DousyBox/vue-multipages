const fs = require("fs");
const glob = require("glob");
const path = require("path");
const devServer = require("./vue.server.js");
function fullPath(dir) {
  return path.join(__dirname, dir);
}

let pathArg = "pages";

/* 
  npm run build somepath
  process.argv[3] is "somepath"
  vue inspect --mode production
  process.argv[3] is "--mode"
*/
let cmd = process.argv[2];
if (["serve", "build"].includes(cmd)) {
  pathArg = process.argv[3] || "pages";
}

const pagesPath = `src/${pathArg}`;
if (!fs.existsSync(pagesPath)) {
  throw `can not find the path named ${process.argv[3]}`;
}

/* collect pages info */
let pages = {};
glob.sync(`${pagesPath}/**/*app.js`).forEach(path => {
  let tempPath = path.split("src/pages/")[1];
  let title = tempPath.match(/[^/]+(?!.*\/)/)[0].match(/(.*)\.app.js/);
  title = title ? title[1] : undefined;
  let filePath = tempPath.split(/\/[^/]*app.js/)[0];
  let filename = filePath + ".html";
  let template = fullPath(path.replace(/\.js$/, ".html"));
  pages[filePath] = {
    entry: path,
    filename: filename,
    title: title,
    template: template,
    chunks: ["chunk-vendors", "chunk-common", filePath]
  };
});

module.exports = {
  pages,
  /* use to debug production problem */
  productionSourceMap: true,
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    /* add some useful path alis */
    config.resolve.alias
      .set("@", fullPath("src"))
      .set("libs", fullPath("src/libs"))
      .set("assets", fullPath("src/assets"))
      .set("plugins", fullPath("src/plugins"))
      .set("components", fullPath("src/components"));
    /* resolve html-webpack-plugin minify options */
    Object.keys(pages).forEach(filePath => {
      config.plugin(`html-${filePath}`).tap(args => {
        if (args[0].minify) {
          args[0].minify.removeAttributeQuotes = false;
        }
        return args;
      });
    });
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
          reuseExistingChunk: true
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true
        }
      }
    });
  },
  /* add devServer, startup a local mock server */
  devServer
};
