const jokeController = require("../../controllers/jokeController");

const sendJoke = async (message) => {
  const joke = await jokeController.getMeJoke();

  message.reply("Ha bhej rha hu ruk !!!");
  setTimeout(function () {
    message.channel.send(joke.setup);
    message.channel.send(joke.delivery);
  }, 1000);
};
module.exports = { sendJoke };
