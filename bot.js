const express = require("express");
require("dotenv").config();
const contestController = require("./controllers/contestController");
const commandsHandler = require("./handlers/messageHandler/commandsHandler");
const app = express();
const contestHandler = require("./handlers/messageHandler/contest");
const platForms = {
  cf: "codeforces",
  cc: "code_chef",
  ac: "at_coder",
  tc: "top_coder",
  ks: "kick_start",
  lc: "leet_code",
};
let contests = {
  cf: [],
  cc: [],
  ac: [],
  tc: [],
  ks: [],
  lc: [],
};

app.listen(10000, () => {
  console.log("messaged Ping !");
});
app.get("/", (_req, res) => {
  res.send("Hello World !");
});

const Discord = require("discord.js");
const { scheduleJob } = require("node-schedule");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("messageCreate", (message) => {
  commandsHandler.messageHandler(message, platForms, contests);
});

let channel;
client.on("ready", async () => {
  channel = client.channels.cache.find((e) => {
    if (e.id == process.env.channelId) return e;
  });
  assignContests();
  sayHi();
});

async function sayHi() {
  console.log("Bot is Online....");
}



const assignContests = async () => {
  for (const plat in platForms) {
    console.log("Plateform---", platForms[plat]);
    const contest = await contestController.getMeContest(platForms[plat]);
    contests[plat] = contest;
  }
  console.log(contests);
};
client.login(process.env.TOKEN);



const scheduleContest = (platform, index) => {
  const name = contests[platform][index].name;
  const date = contests[platform][index].start_time;
  scheduleJob(name, date, () => {
    console.log("Sending Message");
    contestHandler.sendContestForPlateform(
      platform,
      contests[platform][index],
      false,
      channel
    );
  });
};
