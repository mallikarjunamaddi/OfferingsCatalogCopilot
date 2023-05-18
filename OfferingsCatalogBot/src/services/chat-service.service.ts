import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conversation } from 'src/models/Conversation';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  apiURL: string;

  constructor(private httpClient: HttpClient) {
    this.apiURL = 'http://localhost:8000/'
  }

  public getQueryResponse(query: string, chatHistory: Conversation[]): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/html')
      .set('gptInitialQuery', query);
    
    const body = {
      "chatHistory": chatHistory
    }
    return this.httpClient.post<string>(this.apiURL, body, { headers: headers });
  }
}