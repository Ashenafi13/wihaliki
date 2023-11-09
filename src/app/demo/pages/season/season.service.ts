
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SeasonService {

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
      environment.url + `all/season`,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  GetEpisodes(season_Id:any) {
    return this.http.get<any>(
      environment.url + `list/season/episodes?season_id=${season_Id}`,
      {
        headers: this.httpOptions.header,
      }
    );
  }
AddEpisodes(data:any){
  return this.http.post<any>(
    environment.url + `episode/add`,
    data,
    {
      headers: this.httpOptions.header,
    }
  );
}
UpdateEpisode(Id:any, data:any){
  return this.http.post<any>(
    environment.url + `episode/update?Id=${Id}`,
    data,
    {
      headers: this.httpOptions.header,
    }
  );
}
ActiveSeasonEpisode(episode_Id:any,season_id:any){
  return this.http.post<any>(
    environment.url + `season/episode/activate?episode_Id=${episode_Id}&season_id=${season_id}`,
    {
      headers: this.httpOptions.header,
    }
  );
}
   AddSeason(data:any){
    return this.http.post<any>(
      environment.url + `season/add`,
      data,
      {
        headers: this.httpOptions.header,
      }
    );
  }

  updateSeason(season_Id:any, data:any){
    return this.http.post<any>(
      environment.url + `season/update?season_Id=${season_Id}`,
      data,
      {
        headers: this.httpOptions.header,
      }
    );
  }


}
