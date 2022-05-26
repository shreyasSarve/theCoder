const { embedForContest } = require("../handlers/contest");
const { getTodaysContest } = require("../handlers/helper");
const { contests, platForms } = require("../shared");

module.exports.run = (_client, message, args) => {
  console.log(`Iside today-----------`);
  let option = 0;
  if (args.length == 0) {
    let totalContest = 0;
    for (const platform in platForms) {
      const contest = getTodaysContest(platform);
      if (contest.length == 0) continue;
      totalContest++;
      console.log("Contests", contest);
      const embed = embedForContest(platform, contest, option);
      message.channel.send({ embeds: [embed] });
    }
    if (totalContest == 0) {
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
      message.channel.send({ embeds: [embed] });
    }
  }
};
