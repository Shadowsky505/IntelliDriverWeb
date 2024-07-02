// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ChatbotService {
  private apiUrl = 'http://localhost:3000'; // URL del servidor

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/openai`, { message });
  }

  getDtcs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/dtcs`);
  }
}
