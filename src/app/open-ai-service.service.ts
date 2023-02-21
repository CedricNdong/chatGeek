import { Injectable } from '@angular/core';
import { Configuration,OpenAIApi } from 'openai';
@Injectable({
  providedIn: 'root'
})
export class OpenAiServiceService {
  private readonly openAiApi!: OpenAIApi;
  private readonly configuration!: Configuration;
  apiKey: string = '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'
  ;

  constructor() { 
    this.configuration = new Configuration({apiKey: this.apiKey});
    this.openAiApi = new OpenAIApi(this.configuration);
  }

   getResponse(prompt: string) {
    return  this.openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:","AI:"],
      });
  }
}

