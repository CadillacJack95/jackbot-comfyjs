require("dotenv").config();
const ComfyJS = require("comfy.js");

const commands = require("./commands");

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (command === "help") {
    commands.SendHelp();
  }

  if (command === "discord") {
    commands.Discord();
  }

  if (command === "twitter") {
    commands.Twitter();
  }

  if (command === "github") {
    commands.Github();
  }

  if (command === "so") {
    commands.ShoutOut(message);
  }

  if (command === "light") {
    commands.Light(message);
  }
};
ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH);

// bits:read channel:read:hype_train channel:read:subscriptions whispers:edit whispers:read chat:read chat:edit channel:moderate channel:read:redemptions user:read:email
