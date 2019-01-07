const ecstatic = require("ecstatic"),
  os = require("os"),
  ifaces = os.networkInterfaces(),
  chalk = require("chalk");
module.exports = {
  before(app) {
    /* a local mock middleware */
    app.use(ecstatic({ root: "static/mock", baseDir: "/mock" }));
  },
  /* after: (app, server) => {
    console.log("  - Available on:");
    Object.keys(ifaces).forEach(function(ifa) {
      ifaces[ifa].forEach(function(details) {
        if (details.family === "IPv4") {
          console.log(
            "  " +
              protocol +
              details.address +
              ":" +
              colors.green(port.toString())
          );
        }
      });
    });
  }, */
  historyApiFallback: false,
  host: "0.0.0.0",
  public: "",
  open: true,
  openPage: "mock/path/to/some.json"
};
