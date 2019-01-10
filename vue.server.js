const ecstatic = require("ecstatic");
module.exports = {
  before(app) {
    /* a local mock middleware */
    app.all(
      `${process.env.API_CONTEXT}/*`,
      ecstatic({
        root: `public/api`,
        showdir: true,
        baseDir: process.env.API_CONTEXT
      })
    );
  },
  historyApiFallback: false,
  host: "0.0.0.0",
  public: "",
  open: true,
  openPage: "mock/path/to/some.json"
};
