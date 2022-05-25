const createPlatform = function (title, url, _icon, color) {
  return {
    name: title,
    url: url,
    color: color,
  };
};

const platformsDetails = {
  cf: createPlatform(
    "CodeForces",
    "https://codeforces.com/",
    "Will Find Out ",
    "#FF0000"
  ),
  cc: createPlatform(
    "Codecheff",
    "https://codecheff.com/",
    "Will Find Out ",
    "#62351A"
  ),
  ac: createPlatform(
    "AtCoder",
    "https://atcoder.jp/home",
    "Will Find out",
    "#222222"
  ),
  tc: createPlatform(
    "TopCoder",
    "https://www.topcoder.com/",
    "Will Find out",
    "#0C0C0C"
  ),
  ks: createPlatform(
    "KickStart",
    "https://codingcompetitions.withgoogle.com/kickstart",
    "Will Find out later",
    "#C3EB5A"
  ),
  lc: createPlatform(
    "LeetCode",
    "https://leetcode.com/",
    "Will Find out Later",
    "#F09D1A"
  ),
};
const discription = [
  "Todays Contests",
  "Upcoming Contests",
  "Sorry No Contests Today",
  "Early Reminder for Todays Contest ⏰",
  "Contest is Live Now 💥",
  "Contest Ended ✊",
];

module.exports = { platformDetails: platformsDetails, discription };
