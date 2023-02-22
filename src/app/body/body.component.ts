import { Component } from '@angular/core';
import { ChatConversation } from 'src/model/chatConversation';
import { OpenAiServiceService } from '../open-ai-service.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent{

  promptText:string ='';
  chatConversation: ChatConversation[] = [];

  showLoading = false;
  constructor(private openaiService:OpenAiServiceService ) { }

   submitMessage(){
    console.log("Message submitted");
    if (this.promptText === ''){
      return;
    }

    try{
    let geekMessage : ChatConversation ={
      messageFrom:1,
      message: this.promptText
    }

    this.chatConversation.push(geekMessage);
    let userPrompt = this.createdPrompt();
    this.promptText = '';
    this.showLoading = true;
    this.openaiService.getResponse(userPrompt).then((response) =>{
      this.showLoading = false;
      let kiMessage : ChatConversation ={
        messageFrom:2,
        message: response
      }
      this.chatConversation.push(kiMessage);

      }
    );
    }catch(error:any) {
      this.showLoading = false;
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        
      }
    }
  }

  private createdPrompt(){
    let prompt = '';
    this.chatConversation.forEach((chat) => {
      if (chat.messageFrom === 1){
        prompt += '\nHuman: '+chat.message;
      }else{
        prompt += '\nAI: '+chat.message;
      }
    });
    return prompt;
  }
  
}
