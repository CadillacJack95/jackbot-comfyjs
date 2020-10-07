require("dotenv").config();

const v3 = require("node-hue-api").v3;
const discovery = v3.discovery;

async function ConnectToHueBridge() {
  try {
    const searchResults = await discovery.nupnpSearch();

    if (searchResults) {
      const host = searchResults[0].ipaddress;
      const api = await v3.api
        .createLocal(host)
        .connect(process.env.HUE_USERNAME);

      return api;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  ConnectToHueBridge,
};
