const { embedForContest } = require("../handlers/contest");
const { getTodaysContest } = require("../handlers/helper");
const { contests, platForms } = require("../shared");

module.exports.run = (_client, message, args) => {
  const platform = "cc";
  console.log(`Iside ${platform}-----------`);
  let contest = contests[platform];
  let option = 1;
  if (args.length <= 1) {
    if (args[0] == "today") {
      option = 0;
      contest = getTodaysContest(platform);
    }
    if (contest.length == 0) option = 2;
    console.log("Contests", contest);
    const embed = embedForContest(platform, contest, option);
    message.channel.send({ embeds: [embed] });
  } else return;
};
