const { getMeJoke } = require("../controllers/jokeController");

module.exports.run = async (_client, message, _args) => {
  const joke = await getMeJoke();
  message.reply("Ha bhej rha hu ruk !!!");
  setTimeout(function () {
    message.channel.send(joke.setup);
    message.channel.send(joke.delivery);
  }, 1000);
};
