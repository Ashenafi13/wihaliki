
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddQuestionsService {

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

  GetSeasons() {
    return this.http.get<any>(
      environment.url + `seasons`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  GetEpisodes() {
    return this.http.get<any>(
      environment.url + `episodes`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  AddQuestions(data:any) {
    return this.http.post<any>(
      environment.url + `add/questions`,data,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  GetQuestions(){
    return this.http.get<any>(
      environment.url + `questions`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
  AddChoices(data:any) {
    return this.http.post<any>(
      environment.url + `add/choices`,data,
      {
        headers: this.httpOptions.header,
      }
    );
  }
  // UpdateQuestions(data:any,id:any) {
  //   return this.http.post<any>(
  //     environment.url + `add/choices`,data,
  //     {
  //       headers: this.httpOptions.header,
  //     }
  //   );
  // }
  GetChoices(QId:any){
    return this.http.get<any>(
      environment.url + `choices?Qid=${QId}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  UpdateChoices(data,id:any){
    return this.http.post<any>(
      environment.url + `update/choices?id=${id}`, data,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  DeleteChoices(id:any){
    return this.http.post<any>(
      environment.url + `delete/choices?id=${id}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
}
