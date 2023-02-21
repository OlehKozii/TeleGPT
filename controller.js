const bot = require("./bot");
const { model, openai } = require("./openai");
const logger = require("./logger");

const decode = (message) => {
  return message;
  // return he.decode(message.substring(message.lastIndexOf("\n")));
};
class botController {
  start = async (msg) => {
    await bot.sendMessage(
      msg.chat.id,
      "Welcome to the TeleGPT bot v0.1(Beta)! To use this bot, send a message with your question or type it in inline mode.\n\nContact @Oleh_P0se1d0n if you have any suggestions or wishes\n\nP.S.After the next update you will need to provide your ChatGPT token with /token command to use this bot"
    );
  };

  //Future feature
  tokenProviding = async (msg) => {
    const token = msg.text.slice("/token".length).trim();
    if (token) {
      await bot.sendMessage(
        msg.chat.id,
        "Thank you for providing your key but this feature is not ready yet"
      );
    } else {
      await bot.sendMessage(msg.chat.id, "You didn't send token");
    }
  };

  message = async (msg) => {
    const prompt = msg.text.trim();
    const options = {
      reply_to_message_id: msg.message_id,
      chat_id: msg.chat.id,
    };
    const waitingMessage = await bot.sendMessage(
      msg.chat.id,
      "ChatGPT is generating answer...",
      options
    );
    await openai
      .createCompletion({
        model: model,
        prompt: prompt,
        max_tokens: 2048,
      })
      .then(async (response) => {
        let reply = decode(response.data.choices[0].text.trim());
        try {
          await bot.editMessageText(reply, {
            chat_id: msg.chat.id,
            message_id: waitingMessage.message_id,
          });
          await logger.message(msg);
        } catch (e) {
          console.log(
            `Message error ${msg.from.first_name}(@${msg.from.username}): \n${msg.text}\n`
          );
        }
      })
      .catch(async (error) => {
        console.error(error);
        await bot.sendMessage(
          msg.chat.id,
          "Error generating response",
          options
        );
      });
  };

  inline = async (msg) => {
    const prompt = msg.query.trim();
    await openai
      .createCompletion({
        model: model,
        prompt: prompt,
        max_tokens: 2048,
      })
      .then(async (response) => {
        const reply = `Question:${msg.query}\nAnswer:${decode(
          response.data.choices[0].text.trim()
        )}`;
        try {
          await bot.answerInlineQuery(
            msg.id,
            [
              {
                id: 1,
                title: reply,
                type: "article",
                message_text: reply,
              },
            ],
            { cache_time: 39 }
          );
          await logger.inline(msg);
        } catch (e) {
          console.log(e);
          console.log(
            `Inline error ${msg.from.first_name}(@${msg.from.username}) - ${msg.query}`
          );
        }
      })
      .catch(async (error) => {
        console.error(error);
      });
  };
}

module.exports = new botController();
