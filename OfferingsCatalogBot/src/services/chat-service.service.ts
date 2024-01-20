import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conversation } from 'src/models/Conversation';
import { environment } from 'environments/env.dev';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  apiBaseURL: string;

  constructor(private httpClient: HttpClient) {
    this.apiBaseURL =  environment.apiBaseURL;
  }

  public getQueryResponse(query: string, chatHistory: Conversation[]): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/html')
      .set('gptInitialQuery', query);
    
    const body = {
      "chatHistory": chatHistory
    }
    return this.httpClient.post<string>(this.apiBaseURL, body, { headers: headers });
  }
}