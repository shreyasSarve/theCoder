const { platForms, contests } = require("../shared");
const { platformDetails } = require("../models/data");

module.exports.run = (_client, message, _args) => {
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
  for (const plateform in platForms) {
    embed.fields.push({
      name: platformDetails[plateform].name,
      value: `?${plateform}`,
    });
  }
  embed.fields.push({
    name: "For all contests",
    value: "?contests",
    inline: false,
  });
  embed.fields.push({ name: "for Help", value: "?help" });
  embed.fields.push({ name: "JOke", value: "?joke" });
  embed.fields.push({
    name: "Ajj Ke contests",
    value: "?platform_alias today",
  });

  message.channel.send({ embeds: [embed] });
};

module.exports.name = "help";
