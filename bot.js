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
  if (command === "attention") {
    commands.GetMyAttention(flags);
  }
};

ComfyJS.onCheer = (user, message, bits, flags, extra) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.Raid = (user, viwers, extra) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.onHosted = (user, viewers, autohost, extra) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.onSub = (user, message, subTierInfo, extra) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.onResub = (
  user,
  message,
  streamMonths,
  cumulativeMonths,
  subTierInfo,
  extra
) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.onSubGift = (
  gifterUser,
  numOfSubs,
  senderCount,
  subTierInfo,
  extra
) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.OnGiftSubContinue = (user, sender, extra) => {
  commands.ChangeLightOnEvent();
};

ComfyJS.onReward = (user, reward, cost, message, extra) => {
  commands.AddNewCustomColor(user, message);
};

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH);

// bits:read channel:read:hype_train channel:read:subscriptions whispers:edit whispers:read chat:read chat:edit channel:moderate channel:read:redemptions user:read:email
