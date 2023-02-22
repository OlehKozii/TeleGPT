require("dotenv").config({ path: "./.env" });

const express = require("express");

const bot = require("./bot");
const botController = require("./controller");

var url = "https://tele-gpt.herokuapp.com";
// url = "https://40bf-178-212-111-36.ngrok.io:443"
const port = process.env.PORT;
const app = express();

bot
  .setWebHook(`${url}/bot${process.env.telegramToken}`)
  .then((r) => console.log("Підключення успішне"))
  .catch((e) => console.log("Помилка підключення:" + e));

app.use(express.json());

app.post(`/bot${process.env.telegramToken}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Експресс працює");
});

bot.on("inline_query", async (msg) => {
  await botController.inline(msg);
});

bot.on("message", async (msg) => {
  if (msg.text.startsWith("/start")) {
    await botController.start(msg);
  } else if (msg.text.startsWith("/token")) {
    await botController.tokenProviding(msg);
  } else {
    await botController.message(msg);
  }
});
