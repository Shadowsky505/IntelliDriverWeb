import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: string[] = [];
  dtcs: string[] = [];
  selectedDtc: string = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.loadDtcs();
  }

  loadDtcs() {
    this.chatbotService.getDtcs().subscribe(
      data => {
        console.log(this.dtcs[3]);
        this.dtcs = data;
      },
      error => {
        console.error('Error loading DTCs:', error);
      }
    );
  }

  sendMessage(message: string) {
    if (!message.trim() && !this.selectedDtc) {
      return;
    }

    const fullMessage = this.selectedDtc ? `DTC: ${this.selectedDtc}, Message: ${message}` : message;

    this.messages.push(`You: ${fullMessage}`);

    this.chatbotService.sendMessage(fullMessage).subscribe(
      response => {
        const botMessage = response.botMessage;
        this.messages.push(`Bot: ${botMessage}`);
        console.log(botMessage);
      },
      error => {
        this.messages.push(`Bot: Error en la respuesta del servidor: ${error.message}`);
        console.error('Error:', error);
      }
    );
  }
}
