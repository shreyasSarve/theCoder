const { platForms, contests } = require("../shared");
const contestHandler = require("../handlers/contest");
module.exports.run = (_client, message, _arg) => {
  for (const platform in platForms) {
    const embed = contestHandler.embedForContest(
      platform,
      contests[platform],
      1
    );
    message.channel.send({ embeds: [embed] });
  }
};
