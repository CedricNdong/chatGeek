import { Injectable } from '@angular/core';
import { Configuration,OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OpenAiServiceService {
  private readonly openAiApi!: OpenAIApi;
  private readonly configuration!: Configuration;
  apiKey: string = environment.apiKey;
  ;

  constructor() { 
    this.configuration = new Configuration({apiKey: this.apiKey});
    this.openAiApi = new OpenAIApi(this.configuration);
  }

    async getResponse(prompt: string) {
    let kiPrompt = await this.openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:"," AI:"],
      });

      return kiPrompt .data.choices[0].text;
  }
}

