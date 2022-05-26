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
const { embedForContest } = require("./handlers/contest");
const res = require("express/lib/response");

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
  scheduleJob("30 1 * * *", async () => {
    console.log("Shedulling----");
    assignContests().finally(() => scheduleTodaysContests());
  });
};
/*------------------------ Initialization When Bot Starts --------------------------*/
const assignContests = async () => {
  for (const plat in platForms) {
    console.log("Plateform---", platForms[plat]);
    const contest = await contestController.getMeContest(platForms[plat]);
    contests[plat] = contest;
  }
  scheduleTodaysContests();
};
client.login(process.env.TOKEN);

/*----------------------- Handlers Commands responces --------------------------*/
client.on("messageCreate", (message) => {
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

/*---------------------Schedular----------------------------*/
const scheduleTodaysContests = () => {
  let totalToday = 0;
  console.log("Scheduling Todays Contest !!!");
  for (const plateform in platForms) {
    const date = new Date(Date.now()).toLocaleDateString("en");
    contests[plateform].forEach((contest) => {
      const start_date = contest.start_time.toLocaleDateString("en");
      if (start_date == date) {
        console.log(`scheduling...${contest.name}`);
        contest.scheduled = true;
        totalToday++;
        const earlyReminder = new Date(contest.start_time).setMinutes(
          contest.start_time.getMinutes() - 5
        );
        const todaysContestEmbed = embedForContest(plateform, [contest], 0);
        channel.send({ embeds: [todaysContestEmbed] });

        scheduleJob(`${contest.name} Early Reminder`, earlyReminder, () => {
          channel.sendTyping();
          setTimeout(() => earlyCallBack(plateform, contest), 1000);
        });
        scheduleJob(`${contest.name} Live Reminder`, contest.start_time, () => {
          channel.sendTyping();
          setTimeout(() => liveCallBack(plateform, contest), 2000);
        });
        scheduleJob(`${contest.name} Ended Reminder`, contest.end_time, () => {
          channel.sendTyping();
          setTimeout(() => endedCallBack(plateform, contest), 2000);
        });
      }
    });
  }

  if (totalToday == 0) {
    const embed = {
      color: "#00FF00",
      title: `No Contests Today`,
      author: {
        name: `The Coder`,
      },
      fields: [],
      description: "No Contests Today Enjoy ",
      timestamp: new Date(),
      footer: {
        text: "Happy Coding guys !!!!",
      },
    };
    channel.send({ embeds: [embed] });
  }
};
/*-------------CallBacks----------------------------*/
const earlyCallBack = (plateform, contest) => {
  console.log("Message Send !!!");
  channel.sendTyping();
  const earlyEmbed = embedForContest(plateform, [contest], 3);
  channel.send({ embeds: [earlyEmbed] });
};
const liveCallBack = (plateform, contest) => {
  channel.sendTyping();
  const liveEmbed = embedForContest(plateform, [contest], 4);
  channel.send({ embeds: [liveEmbed] });
};
const endedCallBack = (plateform, contest) => {
  channel.send(`>>> **${contest.name}** \nEnded \n✊✊✊`);
  const index = contests[plateform].indexOf(contest);
  contests[plateform].splice(index, 1);
  console.log("Deleted !!!!");
};
