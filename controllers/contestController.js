const axios = require("axios");
const baseURL = "https://kontests.net/api/v1/";
const date = new Date("2022-05-20 09:30:00 UTC").toLocaleString("en", {
  timeZone: "Asia/KOlkata",
});
const getMeContest = async (platformName) => {
  const uri = baseURL + platformName;
  const res = await axios.get(uri)
    .then((r) => {
      return r.data;
    })
    .catch((e) => console.log(e));
  const data = res;
  let contests = new Array();
  for (let contest of data) {
    let start_time = new Date(contest.start_time);
    let end_time = new Date(contest.end_time);
    let duration = contest.duration;
    let url = contest.url;
    let flag = true;
    if (contest.in_24_hours == "No") {
      flag = false;
    }
    contests.push({
      name: contest.name,
      start_time: start_time,
      end_time: end_time,
      duration: duration,
      flag: flag,
      url: url,
      scheduled: false,
    });
  }
  contests.sort((a, b) => {
    return a.start_time - b.start_time;
  });
  return contests;
};

module.exports = {
  getMeContest,
};
