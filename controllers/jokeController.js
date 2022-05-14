const fetch = require("node-fetch");
const url = "https://v2.jokeapi.dev/joke/Any?type=twopart";
const getMeJoke = async () => {
  const res = await fetch(url);
  return res.json();
};

module.exports = {
  getMeJoke,
};
