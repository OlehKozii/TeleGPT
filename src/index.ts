import * as dotenv from "dotenv";
dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

import bot from "./config/telegram";
import messageController from "./controller/messageController";
import express, { Request, Response } from "express";

const port = process.env.PORT;
const app = express();

bot
  .setWebHook(`${process.env.url}/bot${process.env.telegramToken}`)
  .then((r) => console.log("Підключення успішне"))
  .catch((e) => console.log("Помилка підключення:" + e));

app.use(express.json());

app.post(`/bot${process.env.telegramToken}`, (req: Request, res: Response) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Експресс працює");
});

bot.on("inline_query", async (msg) => {
  await messageController.inline(msg);
});

bot.on("message", async (msg) => {
  if (msg.text?.startsWith("/start")) {
    await messageController.start(msg);
  } else if (msg.text?.startsWith("/token")) {
    await messageController.tokenProviding(msg);
  } else {
    await messageController.message(msg);
  }
});
