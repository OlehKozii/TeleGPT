const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.telegramToken);

module.exports = bot;
