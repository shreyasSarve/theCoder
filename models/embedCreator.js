const { platformDetails, discription } = require("./data");

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
  console.log(start_time);
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

module.exports = { createEmbedForPlatForm };
