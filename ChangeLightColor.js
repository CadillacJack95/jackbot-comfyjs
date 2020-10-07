require("dotenv").config();

const v3 = require("node-hue-api").v3;
const namedColors = require("color-name-list");
const ComfyJS = require("comfy.js");
const hexRgb = require("hex-rgb");
const lightConfig = require("./lightsConfig");

const LightState = v3.lightStates.LightState;

async function changeLightColor(requestedColor) {
  const lightID = [5, 6, 7, 8, 10, 12, 13];
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
    }
  } else {
    ComfyJS.Say(
      `${requestedColor} does not exist. For a list of colors you can head to this link: https://codepen.io/meodai/full/VMpNdQ`
    );
  }
}

module.exports = {
  changeLightColor,
};
