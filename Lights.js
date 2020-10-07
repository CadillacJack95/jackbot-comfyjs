require("dotenv").config();

const v3 = require("node-hue-api").v3;
const namedColors = require("color-name-list");
const ComfyJS = require("comfy.js");
const hexRgb = require("hex-rgb");
const lightConfig = require("./lightsConfig");

const LightState = v3.lightStates.LightState;
const lightID = [5, 6, 7, 8, 10, 12, 13];
async function changeLightColor(requestedColor) {
  const offState = new LightState().off(true);
  let foundColor;
  let RGB;

  const api = await lightConfig.ConnectToHueBridge();

  foundColor = namedColors.find(
    (color) => color.name.toLowerCase() === requestedColor.toLowerCase()
  );

  if (api) {
    if (requestedColor.toLowerCase() === "black") {
      return lightID.map((light) => api.lights.setLightState(light, offState));
    }

    if (foundColor) {
      RGB = hexRgb(foundColor.hex);

      const colorState = new LightState()
        .on(true)
        .brightness(100)
        .rgb(RGB.red, RGB.green, RGB.blue);

      return lightID.map((light) =>
        api.lights.setLightState(light, colorState)
      );
    } else if (requestedColor.startsWith("#")) {
      RGB = hexRgb(requestedColor);
      const colorState = new LightState()
        .on(true)
        .brightness(100)
        .rgb(RGB.red, RGB.green, RGB.blue);

      return lightID.map((light) =>
        api.lights.setLightState(light, colorState)
      );
    } else {
      ComfyJS.Say(
        `${requestedColor} does not exist. For a list of colors you can head to this link: https://codepen.io/meodai/full/VMpNdQ`
      );
    }
  }
}

async function changeLightOnevent() {
  const red = [255, 0, 0];
  const green = [0, 255, 0];
  const blue = [0, 0, 255];

  const colors = [red, green, blue];

  const api = await lightConfig.ConnectToHueBridge();

  for (let i = 0; i < 3; i++) {
    const eventState = new LightState()
      .on(true)
      .brightness(100)
      .alert("select")
      .rgb(colors[i]);

    lightID.map((light) => api.lights.setLightState(light, eventState));
  }
}

async function getMyAttention() {
  const api = await lightConfig.ConnectToHueBridge();
  const alertState = new LightState()
    .on(true)
    .brightness(100)
    .alert("select")
    .rgb(255, 0, 0);

  return lightID.map((light) => api.lights.setLightState(light, alertState));
}

module.exports = {
  changeLightColor,
  changeLightOnevent,
  getMyAttention,
};
