import { Component, OnInit } from '@angular/core';
import { ChatConversation } from 'src/model/chatConversation';
import { OpenAiServiceService } from '../open-ai-service.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  promptText:string ='';
  chatConversation: ChatConversation[] = [];

  showLoading = false;
  constructor(private openaiService:OpenAiServiceService ) { }

  ngOnInit(): void {
  }

   async submitMessage(){
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
    this.promptText = '';
    this.showLoading = true;

    
    let apiResponse = await this.openaiService.getResponse(this.promptText).then((response) =>{
      return response.data.choices[0].text;
    });

    this.showLoading = false;
    let kiMessage : ChatConversation ={
      messageFrom:2,
      message: apiResponse
    }
    this.chatConversation.push(kiMessage);
    }
    catch(error:any) {
      this.showLoading = false;
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        
      }
    }
  }


}
