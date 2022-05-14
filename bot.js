const express = require("express");
require("dotenv").config();
const contestController = require("./controllers/contestController");
const app = express();
const fs = require("fs");
const { platForms, contests } = require("./shared");

app.listen(10000, () => {
  console.log("messaged Ping !");
});
app.get("/", (_req, res) => {
  res.send("Hello World !");
});

const Discord = require("discord.js");
const { scheduleJob } = require("node-schedule");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "?"; // our prefix
client.commands = new Discord.Collection();

let channel; //channel to send reminders
client.on("ready", async () => {
  loadCommands();
  channel = client.channels.cache.find((e) => {
    if (e.id == process.env.channelId) return e;
  });
  assignContests();
  sayHi();
  schedule();
});

async function sayHi() {
  console.log("Bot is Online....");
}
const schedule = () => {
  scheduleJob("28 2 * * *", async () => {
    console.log("Shedulling----");
    fetchNewContest();
    scheduleTodaysContests();
  });
};
/*------------------------ Initialization When Bot Starts --------------------------*/
const assignContests = async () => {
  for (const plat in platForms) {
    console.log("Plateform---", platForms[plat]);
    const contest = await contestController.getMeContest(platForms[plat]);
    contests[plat] = contest;
  }
};
client.login(process.env.TOKEN);

/*----------------------- Handlers Commands responces --------------------------*/
client.on("messageCreate", (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift();
  console.log(args);
  console.log(commandName);
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if (!command) return;
    command.run(client, message, args);
  }
});

/*------------------------ Commands Loader-------------------------------------*/
const loadCommands = () => {
  const commands = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
  console.log("files", commands);
  for (const file of commands) {
    const commandName = file.split(".")[0];
    console.log("file", commandName);
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName, command);
  }
};
const fetchNewContest = async () => {
  console.log("Fetching New Entries !!!!");
  for (let platform in platForms) {
    const contest = await contestController.getMeContest(platForms[platform]);
    contest.forEach((e) => {
      const isExist = contests[platform].find(
        (el) => el.start_time == e.start_time
      );
      if (!isExist) contests[platform].push(e);
    });
    contests[platform].sort((a, b) => {
      return a.start_time - b.start_time;
    });
  }
};
const scheduleTodaysContests = () => {
  console.log("Scheduling Todays Contest !!!");
  for (const plateform in platForms) {
    const date = new Date(Date.now()).toLocaleDateString("en");
    contests[plateform].forEach((contest) => {
      const start_date = contest.start_time.toLocaleDateString("en");
      if (start_date == date) {
        contest.scheduled=true;
        console.log("Scheduling", contest);
        const earlyReminder = new Date(contest.start_time).setMinutes(
          contest.start_time.getMinutes() - 5
        );
        scheduleJob(`${contest.name} Early Reminder`, earlyReminder, () => {
          channel.log("Early Reminder");
        });
        scheduleJob(`${contest.name}`, contest.start_time, () => {
          console.log("Final Reminder!!!");
          const index = contests[plateform].indexOf(contest);
          contests[plateform].splice(index, 1);
          console.log("Deleted !!!!");
        });
      }
    });
  }
};
