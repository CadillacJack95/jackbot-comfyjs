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

function GetMyAttention(flags) {
  const { broadcaster, subscriber, mod, founder, vip } = flags;

  if (broadcaster || mod || subscriber || founder || vip) {
    LightFunctions.getMyAttention();
  }
}

function AddNewCustomColor(username, hexCode) {
  let newCustomColor = [{ username: username, hexCode: hexCode }];

  fs.readFile(
    "./customcolors.json",
    { encoding: "utf8", flag: "a+" },
    (err, data) => {
      if (err) throw err;

      if (!data) {
        fs.writeFileSync(
          "./customcolors.json",
          JSON.stringify(newCustomColor),
          (err, newCustomColor) => {
            if (err) throw err;
            console.log("file saved");
          }
        );
      }
      if (data) {
        const jsonData = JSON.parse(data);
        let indexOfExisting;
        let foundExisting = false;

        for (var i = 0; i < jsonData.length; i++) {
          if (jsonData[i].username === username) {
            indexOfExisting = i;
            foundExisting = true;
          }
        }

        if (foundExisting) {
          jsonData[indexOfExisting].username = username;
          jsonData[indexOfExisting].hexCode = hexCode;
          console.log("username exists");
        } else {
          jsonData.push({ username, hexCode });
          console.log("username does not exist");
        }

        fs.writeFileSync(
          "./customcolors.json",
          JSON.stringify(jsonData, null, 4),
          (err) => {
            if (err) throw err;
          }
        );
      }
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
