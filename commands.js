require("dotenv").config();
const ComfyJS = require("comfy.js");
const LightFunctions = require("./ChangeLightColor");

function SendHelp() {
  ComfyJS.Say(
    "Commands available !light <colorName>, !discord, !github, !twitter"
  );
}

function Discord() {
  ComfyJS.Say("https://discord.gg/2DbqPHq");
}

function Twitter() {
  ComfyJS.Say("https://twitter.com/CadillacJack95");
}

function Github() {
  ComfyJS.Say("https://github.com/CadillacJack95");
}

function ShoutOut(message) {
  ComfyJS.Say(
    `Go follow ${message} for more Science & Technology content at https://twitch.tv/${message}`
  );
}

function Light(message) {
  LightFunctions.changeLightColor(message);
}

function ChangeLightOnEvent() {
  LightFunctions.changeLightOnevent();
}

module.exports = {
  SendHelp,
  Discord,
  Twitter,
  Github,
  ShoutOut,
  Light,
  ChangeLightOnEvent,
};
