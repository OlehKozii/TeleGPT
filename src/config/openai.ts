import { OpenAIApi, Configuration } from "openai";

class OpenAI {
  private openai: OpenAIApi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.openaiToken,
    })
  );

  message = async (message: string) => {
    const completion = await this.openai.createChatCompletion({
      model: `${process.env.model}`,
      messages: [{ content: message, role: "user" }],
    });
    console.log(completion.data.choices[0].message!.content);
    return completion.data.choices[0].message!.content;
  };
}

export default new OpenAI();
