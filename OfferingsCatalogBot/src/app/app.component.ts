import { Component } from '@angular/core';
import { Conversation } from 'src/models/Conversation';
import { ChatServiceService } from 'src/services/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OfferingsCatalogBot';
  chatHistory: Conversation[] = [];
  query: string = '';

  constructor(private chatService: ChatServiceService) {

  }

  getQueryResponse() {
    if(!this.query) return;
    this.scrollToBottom();
    const currenChatHistory = [...this.chatHistory];
    this.chatHistory.push({ User: this.query });
    this.chatService.getQueryResponse(this.query, currenChatHistory).subscribe((response: string) => {
      this.scrollToBottom();
      this.chatHistory[this.chatHistory.length - 1].Bot = response;
    });
    this.query = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatHistory = document.getElementById('chat-container')!;
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 0);
  }
}
