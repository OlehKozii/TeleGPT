import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(`${process.env.telegramToken}`, { polling:false });

export default bot;
