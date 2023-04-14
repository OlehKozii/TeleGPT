const { OpenAIApi, Configuration } = require("openai");

const model = "gpt-4";

const config = new Configuration({
  apiKey: process.env.openaiToken,
});

const openai = new OpenAIApi(config);

module.exports = { openai, model };
