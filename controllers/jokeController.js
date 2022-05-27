const { default: axios } = require("axios");
const url = "https://v2.jokeapi.dev/joke/Any?type=twopart";
const getMeJoke = async () => {
  return axios.get(url).then((val) => {
    return val.data;
  });
};

module.exports = {
  getMeJoke,
};
