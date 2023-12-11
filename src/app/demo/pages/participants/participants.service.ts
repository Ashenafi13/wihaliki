import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

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

  GetEpisodes(season_Id:any) {
    return this.http.get<any>(
      environment.url + `episodes?season_Id=${season_Id}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  GetCompetitor(season:any, episode:any){
    return this.http.get<any>(
      environment.url + `report/Competitor?season=${season}&episode=${episode}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
 GetDetails(season:any, episode:any,phone:any){
  return this.http.get<any>(
    environment.url + `report/Competitor/details?season=${season}&episode=${episode}&phone=${phone}`,
    {
      headers: this.httpOptions.header,
    }
  );
 }

 Getchoices(){
  return this.http.get<any>(
    environment.url + `report/questions/choices`,
    {
      headers: this.httpOptions.header,
    }
  );
 }

}
