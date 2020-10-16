require("dotenv").config();
const ComfyJS = require("comfy.js");
const LightFunctions = require("./Lights");
const fs = require("fs");

function SendHelp() {
  ComfyJS.Say(
    "Commands available !light <colorName>, !discord, !github, !twitter"
  );
}

function Discord() {
  ComfyJS.Say("https://discord.gg/NzawkjG");
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

function Light(message, username) {
  LightFunctions.changeLightColor(message, username);
}

function ChangeLightOnEvent() {
  LightFunctions.changeLightOnevent();
}

function GetMyAttention(flags) {
  const { broadcaster, subscriber, mod, founder, vip } = flags;

  if (broadcaster || mod || subscriber || founder || vip) {
    LightFunctions.getMyAttention();
  }
}

function AddNewCustomColor(username, hexCode) {
  fs.readFile(
    "./customcolors.json",
    { encoding: "utf8", flag: "a+" },
    (err, data) => {
      if (err) throw err;

      const customColors = data ? JSON.parse(data) : {};

      customColors[username.toLowerCase()] = hexCode;
      fs.writeFileSync(
        "./customcolors.json",
        JSON.stringify(customColors, null, 4),
        (err) => {
          if (err) throw err;
        }
      );
    }
  );
}

module.exports = {
  SendHelp,
  Discord,
  Twitter,
  Github,
  ShoutOut,
  Light,
  ChangeLightOnEvent,
  GetMyAttention,
  AddNewCustomColor,
};
