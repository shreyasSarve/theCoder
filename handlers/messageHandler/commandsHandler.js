const embedCreator = require("../../models/embedCreator");
const contestHandler = require("./contest");
const jokeHandler = require("./joke");

const messageHandler = async (message, platForms, contests) => {
  if (message.content.startsWith("!")) {
    if (message.content === "!joke") {
      jokeHandler.sendJoke(message);
    } else if (message.content === "!contests") {
      for (const platform in platForms) {
        contestHandler.sendContestForPlateform(
          platform,
          contests[platform],
          1,
          message.channel
        );
      }
    } else if (message.content == "!help") {
      embedCreator.sendHelp(platForms, message.channel);
    } 
    else {
      let requiredPlatform;
      let contestArray = contests;
      let option = 1;

      for (const platform in platForms) {
        if (message.content.startsWith(`!${platform}`)) {
          requiredPlatform = platform;
        }
      }
      console.log(requiredPlatform);
      if (requiredPlatform != undefined) {
        contestArray = contests[requiredPlatform];
        console.log(contestArray);

        if (message.content == `!${requiredPlatform} today`) {
          contestArray = contestArray.filter((e) => {
            if (e.flag) return e;
          });
          if (contestArray.length == 0) option = 2;

          console.log(contestArray);
        }

        contestHandler.sendContestForPlateform(
          requiredPlatform,
          contestArray,
          option,
          message.channel
        );
      }
    }
  }
};
module.exports = { messageHandler };
