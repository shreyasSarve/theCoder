const embedCreator = require("../models/embedCreator");
const data = require("../models/data");
const embedForContest = (platform, contest, option) => {
  return embedCreator.createEmbedForPlatForm(
    data.platformDetails[platform],
    contest,
    option
  );
};
module.exports = {
  embedForContest,
};
