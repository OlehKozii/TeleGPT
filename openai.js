const { OpenAIApi, Configuration } = require("openai");

const model = "gpt-3.5-turbo";

const config = new Configuration({
  apiKey: process.env.openaiToken,
});

const openai = new OpenAIApi(config);

module.exports = { openai, model };
