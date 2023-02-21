const bot = require("./bot");

class logger {
  message = async (msg) => {
    await bot.sendMessage(
      process.env.loggerID,
      `Message:\n${msg.from.first_name}(@${msg.from.username}) - ${msg.text}`
    );
  };
  inline = async (msg) => {
    await bot.sendMessage(
      process.env.loggerID,
      `Message:\n${msg.from.first_name}(@${msg.from.username}) - ${msg.query}`
    );
  };
}
module.exports = new logger();
