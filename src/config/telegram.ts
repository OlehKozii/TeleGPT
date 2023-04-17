import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(`${process.env.telegramToken}`, { polling: true });

export default bot;
