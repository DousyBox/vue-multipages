const defaults = {
  host: "0.0.0.0",
  port: 8080,
  https: false
};

module.exports = (api, projectOptions) => {
  // api.service.run("devserve").then;
  api.registerCommand(
    "customServe",
    {
      description: "start customize development server",
      usage: "vue-cli-service serve [options] [entry]",
      options: {
        "--open": `open browser on server start`,
        "--copy": `copy url to clipboard on server start`,
        "--mode": `specify env mode (default: development)`,
        "--host": `specify host (default: ${defaults.host})`,
        "--port": `specify port (default: ${defaults.port})`,
        "--https": `use https (default: ${defaults.https})`,
        "--public": `specify the public network URL for the HMR client`
      }
    },
    async function serve(args, rawArgv) {
      api.service.run("serve", args, rawArgv).then(function(serveInfo) {
        serveInfo.server.listeningApp.address().port;
      });
    }
  );
};

module.exports.defaultModes = {
  customServe: "development"
};
