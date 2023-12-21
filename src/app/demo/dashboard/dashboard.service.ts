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




  GetActive(){
    return this.http.get<any>(
      environment.url + `active/season`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  UpdateStartTime(){
    return this.http.post<any>(
      environment.url + `update/start/end/date`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  RegisterCompitator(){
    return this.http.post<any>(
      environment.url + `add/registor`,
      {
        headers: this.httpOptions.header,
      }
    );
  }


  GetTime(){
    return this.http.get<any>(
      environment.url + `reg/time/tracker`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  updateTime(time:any){
    return this.http.put<any>(
      environment.url + `update/time`,
      time,
      {
        headers: this.httpOptions.header,
      }
    );
  }



 GetCompitator(){
  return this.http.get<any>(
    environment.url + `get/registers`,
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
