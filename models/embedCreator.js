const { EmbedBuilder } = require("@discordjs/builders");
const { platformDetails } = require("./data");
const { discription } = require("./data");

const createEmbedForSingle = (platform, contest, option) => {
  return {
    color: `${platform.color}`,
    title: `${platform.name}`,
    url: `${platform.url}`,
    author: {
      name: `The Coder`,
    },
    description: `${discription[option]}`,
    fields: [makeField(contest.name, contest.start_time, contest.url)],
    timestamp: new Date(),
    footer: {
      text: "Happy Coding guys !!!!",
    },
  };
};

const createEmbedForPlatForm = (platform, contests, option) => {
  const embed = {
    color: `${platform.color}`,
    title: `${platform.name}`,
    url: `${platform.url}`,
    author: {
      name: `The Coder`,
    },
    fields: [],
    description: `${discription[option]}`,
    timestamp: new Date(),
    footer: {
      text: "Happy Coding guys !!!!",
    },
  };
  for (let contest of contests) {
    console.log(contest);
    embed.fields.push(makeField(contest.name, contest.start_time, contest.url));
  }
  return embed;
};

const makeField = (name, start_time, url) => {
  const time = start_time.toLocaleString("en", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const field = {
    name: name,
    value: time + `\n[Link](${url})`,
  };
  console.log(field);
  return field;
};
const sendHelp = (plateforms, channel) => {
  const embed = {
    color: "#000000",
    title: "Help",
    author: {
      name: `The Coder`,
    },
    description: "This are following commands case-sensitive",
    timestamp: new Date(),
    footer: {
      text: "Happy Coding guys ",
    },
    fields: [],
  };
  for (const plateform in plateforms) {
    embed.fields.push({
      name: platformDetails[plateform].name,
      value: `!${plateform}`,
    });
  }
  embed.fields.push({
    name: "For all contests",
    value: "!contests",
    inline: false,
  });
  embed.fields.push({ name: "for Help", value: "!help" });
  embed.fields.push({ name: "JOke", value: "!joke" });
  embed.fields.push({
    name: "Ajj Ke contests",
    value: "!platform_alias today",
  });
  channel.send({ embeds: [embed] });
};
module.exports = { createEmbedForSingle, createEmbedForPlatForm, sendHelp };
