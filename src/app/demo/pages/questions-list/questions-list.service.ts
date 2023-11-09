import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsListService {

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

  GetQuestions(){
    return this.http.get<any>(
      environment.url + `questions`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
  GetChoices(QId:any){
    return this.http.get<any>(
      environment.url + `choices?Qid=${QId}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
}
