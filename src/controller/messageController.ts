import logger from "../utils/logger";
import bot from "../config/telegram";
import openai from "../config/openai";
import {
  InlineQuery,
  InlineQueryResultArticle,
  Message,
  InlineQueryResult,
} from "node-telegram-bot-api";

class messageController {
  start = async (msg: Message) => {
    await bot.sendMessage(
      msg.chat.id,
      "Welcome to the TeleGPT bot v0.2(Beta)!\n !(Update v0.2) Bot is running on GPT-3.5 model from now!\n\n To use this bot, send a message with your question or type it in inline mode.\n\nContact @Oleh_P0se1d0n if you have any suggestions or wishes\n\nP.S.After the next update you will need to provide your ChatGPT token with /token command to use this bot"
    );
  };

  //Future feature
  tokenProviding = async (msg: Message) => {
    const token = msg.text!.slice("/token".length).trim();
    if (token) {
      await bot.sendMessage(
        msg.chat.id,
        "Thank you for providing your key but this feature is not ready yet"
      );
    } else {
      await bot.sendMessage(msg.chat.id, "You didn't send token");
    }
  };

  message = async (msg: Message) => {
    const prompt = msg.text!.trim();
    const options = {
      reply_to_message_id: msg.message_id,
      chat_id: msg.chat.id,
    };
    const waitingMessage = await bot.sendMessage(
      msg.chat.id,
      "ChatGPT is generating answer...",
      options
    );
    try {
      const response = await openai.message(prompt);
      await bot.editMessageText(response, {
        chat_id: msg.chat.id,
        message_id: waitingMessage.message_id,
      });
      await logger.message(msg);
    } catch (e) {
      console.log(
        `Message error ${msg.from!.first_name}(@${msg.from!.username}): \n${
          msg.text
        }\n`
      );
      await bot.sendMessage(msg.chat.id, "Error generating response", options);
    }
  };

  inline = async (msg: InlineQuery) => {
    const prompt = msg.query.trim();
    try {
      const response = await openai.message(prompt);
      const reply = `Question:${msg.query}\nAnswer:${response}`;
      const rep = await bot.answerInlineQuery(
        msg.id,
        [
          {
            id: "1",
            title: reply,
            type: "article",
            input_message_content: { message_text: reply },
          },
        ],
        {
          cache_time: 39,
        }
      );
      await logger.inline(msg);
    } catch (e) {
      console.log(
        `Inline error ${msg.from.first_name}(@${msg.from.username}) - ${msg.query}`
      );
    }
  };
}

export default new messageController();
