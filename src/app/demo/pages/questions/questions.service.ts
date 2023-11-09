import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization:
      //   'Basic ' +
      //   Buffer.from(
      //     this.storageService.getCode() + ':' + this.storageService.getValue()
      //   ).toString('base64'),
    }),

  };

  GetEpisodeQuestions(){
    return this.http.get<any>(
      environment.url + `episode/questions`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  GetActive(){
    return this.http.get<any>(
      environment.url + `active/season`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  GetCompetitorRank(){
    return this.http.get<any>(
      environment.url + `Competitor/rank`,
      {
        headers: this.httpOptions.header,
      }
    );
  }



  GetCompetitor(QId:any){
    return this.http.get<any>(
      environment.url + `Competitor?QId=${QId}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  RegisterCompetitor(data:any){
    return this.http.post<any>(
      environment.url + `registor/competitor`, data,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  UpdateQuestionsStatus(QId:any){
    return this.http.post<any>(
      environment.url + `questions/status?QId=${QId}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  UpdateQuestionsStart(QId:any){
    return this.http.post<any>(
      environment.url + `add/startDate?QId=${QId}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  AddCompetitor(QId:any){
    return this.http.post<any>(
      environment.url + `add/Competitor?QId=${QId}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
  SendSMS(id:any){
    let data ={
     id:id,
    }
    return this.http.post<any>(
      environment.url + `send/sms`,
      data,
      {
        headers: this.httpOptions.header,
      }
    );
  }
}
