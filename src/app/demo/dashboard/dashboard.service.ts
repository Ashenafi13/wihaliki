import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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


}
