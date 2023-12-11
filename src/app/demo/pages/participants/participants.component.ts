import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from './participants.service';
interface ItemData {
  id: string;
  competitor: string;
  totalPoints: number;
  uId: number;
}
@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  episodes:any[] = [];
  selectedEpisodes:any;
  seasons:any[] =[];
  listOfData: ItemData[] = [];
  selectedSeason:any;
  questions:any[] = [];
  choices:any[] = [];
  constructor(private service:ParticipantsService) { }
  i=0;
  ngOnInit() {
    this.GetSeasons();
    this.GetChoice();
  }

  changeSeason(event:any):void{
    this.GetEpisodes(event,0);
   }
   GetEpisodes(season_Id:any,type:number): void {
    this.service.GetEpisodes(season_Id).subscribe((response: any) => {
      this.episodes = response;
      if (this.episodes.length > 0) {
        let filteredEpisodes = this.episodes.filter(se => se.status == 1);
        this.selectedEpisodes = filteredEpisodes[0].id;
        this.GetCompetitor();
      }

    });
  }
  GetSeasons(): void {
    this.service.GetSeasons().subscribe((response: any) => {
      this.seasons = response;
      if (this.seasons.length > 0) {
        let filteredSeasons = this.seasons.filter(se => se.status == 1);
        this.selectedSeason = filteredSeasons[0].id;
        this.GetEpisodes(this.selectedSeason,0);

      }

    });

  }
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean,phone:string): void {
    if (checked) {
      this.expandSet.clear();
      this.expandSet.add(id);
      this.GetDetails(phone);

    } else {
      this.expandSet.delete(id);
    }
  }

  changeEpisodes(event:any):void{
    this.selectedEpisodes = event;
    this.GetCompetitor();
    // this.GetQuestions(this.selectedSeason,event );
   }

   GetCompetitor():void{
    this.listOfData = [];
    this.service.GetCompetitor(this.selectedSeason,this.selectedEpisodes).subscribe((response:any)=>{
       response.forEach((responses:any)=>{
        this.SetRow(responses);
       });
    });
   }

GetDetails(phone:any):void{
  this.questions = [];
  this.service.GetDetails(this.selectedSeason,this.selectedEpisodes,phone).subscribe((response:any)=>{

      response.forEach((responses:any)=>{
        this.questions.push(
               {
                id:responses.q.quNum,
                answer:responses.mapped.answer,
                msg:responses.mapped.msg,
                question:responses.q.question_label,
                choices:this.filterChoice(responses.q.id)
               }
        );
      });

      console.log(response);
      console.log(this.questions);


  });
}

filterChoice(QId:any):any{

  let filterd = this.choices.filter((choice:any)=>choice.question_id === QId);

   return filterd;
}

GetChoice():void{

  this.service.Getchoices().subscribe((response:any)=>{
     this.choices = response;
  });

}


SetRow(data: any): void {
  this.listOfData = [
    ...this.listOfData,
    {
      id: `${this.i}`,
      competitor: data.phone,
      totalPoints: data.totalAnswered,
      uId: data.id
    },
  ];
  this.i++;
}
}
