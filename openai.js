const { OpenAIApi, Configuration } = require("openai");

const model = "text-davinci-003";

const config = new Configuration({
  apiKey: process.env.openaiToken,
});

const openai = new OpenAIApi(config);

module.exports = { openai, model };
