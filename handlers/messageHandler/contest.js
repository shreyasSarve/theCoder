const embedCreator = require("../../models/embedCreator");
const data = require("../../models/data");
const sendContestForPlateform = (platform, contest, option, channel) => {
  let embed;
  if (option != 0) {
    embed = embedCreator.createEmbedForPlatForm(
      data.platformDetails[platform],
      contest,
      option
    );
  } else
    embed = embedCreator.createEmbedForSingle(
      data.platformDetails[platform],
      contest,
      option
    );
  console.log(embed);
  channel.send({ embeds: [embed] });
};
module.exports = {
  sendContestForPlateform,
};
