const { contests } = require("../shared");

const getTodaysContest = (platform) => {
  const date = new Date(Date.now()).toLocaleDateString();
  return contests[platform].filter((e) => {
    if (e.start_time.toLocaleDateString() == date) return e;
  });
};
module.exports = { getTodaysContest };
