import bot from "../config/telegram";
import { InlineQuery, Message } from "node-telegram-bot-api";
class logger {
  message = async (msg: Message) => {
    await bot.sendMessage(
      `${process.env.loggerID}`,
      `Message:\n${msg.from!.first_name}(@${msg.from!.username}) - ${msg.text}`
    );
  };
  inline = async (msg: InlineQuery) => {
    await bot.sendMessage(
      `${process.env.loggerID}`,
      `Message:\n${msg.from!.first_name}(@${msg.from!.username}) - ${msg.query}`
    );
  };
}
export default new logger();
