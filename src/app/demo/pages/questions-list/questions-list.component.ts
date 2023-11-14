import { Component, OnInit } from '@angular/core';
import { QuestionsListService } from './questions-list.service';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
interface ItemData {
  id: string;
  question: string;
  time: number;
  QId: number;
}
@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  constructor(private service: QuestionsListService) { }
  listOfData: ItemData[] = [];
  choices:any[] = [];
  episodes:any[] =[];
  Questions_List:any[] = [];
  i=0;
  selectedEpisodes: any;
  visible = false;
  seasons:any[] = [];
  selectedSeason:any;
  placement:NzDrawerPlacement ='top';
  reportData:any[] = [];
  ngOnInit() {
    //this.GetQuestions();
    this.GetSeasons();

  }
  close():void{
    this.visible = false;
  }
  open():void{
    this.visible = true;
  }


  transformData(data: any[]): any[] {
    return data.map((item) => {
      return {
        'ስም': item.name,
        // Add other columns as needed
      };
    });
  }
  GetQuestions(season_Id:any, episode_id:any):void{
    this.Questions_List = [];
    this.listOfData = [];
    this.service.GetQuestions(season_Id,episode_id).subscribe((response:any)=>{
      this.Questions_List = response;
      let Q:any[]=[];
      for(let i=0; i<this.Questions_List.length; i++){
        this.SetRow(this.Questions_List[i]);
      }

    });
  }

 GetEpisodes(season_Id:any): void {
  this.service.GetEpisodes(season_Id).subscribe((response: any) => {
    this.episodes = response;
    if (this.episodes.length > 0) {
      let filteredEpisodes = this.episodes.filter(se => se.status == 1);
      this.selectedEpisodes = filteredEpisodes[0].id;
      this.GetQuestions(season_Id,this.selectedEpisodes );
    }
  });
}

GenerateReport():void{
 this.open();
}

 changeSeason(event:any):void{
  this.GetEpisodes(event);
 }

 GetChoices(QId:any): void {
  this.choices = [];
  this.service.GetChoices(QId).subscribe((data:any) => {
    let choices_list = data;
    for(let i=0; i< choices_list.length; i++){
      this.choices.push({
        id: choices_list[i].id,
        choice_label:choices_list[i].choice_label,
        isAnswer:choices_list[i].isAnswer?true:false,
        question_id:choices_list[i].question_id,
        alphabet:choices_list[i].alphabet
      })
    }
  });
}

 SetRow(data: any): void {
  this.listOfData = [
    ...this.listOfData,
    {
      id: `${this.i}`,
      question: data.question_label,
      time: data.time,
      QId: data.id,
    },
  ];
  this.i++;
}

GetSeasons(): void {
  this.service.GetSeasons().subscribe((response: any) => {
    this.seasons = response;
    if (this.seasons.length > 0) {
      let filteredSeasons = this.seasons.filter(se => se.status == 1);
      this.selectedSeason = filteredSeasons[0].id;
      this.GetEpisodes(this.selectedSeason);
      this.reportData = this.transformData(this.seasons);
    }

  });
}

changeEpisodes(event:any):void{
  this.GetQuestions(this.selectedSeason,event );
 }

 expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.clear();
      this.expandSet.add(id);
      this.GetChoices(id);
    } else {
      this.expandSet.delete(id);
    }
  }

 reformatArray(arr) {
  const questions = {};
  arr.forEach(item => {
    const { qts, cho } = item;
    const questionId = qts.id;
    if (!questions[questionId]) {
      questions[questionId] = {
        qts,
        cho: []
      };
    }
    questions[questionId].cho.push(cho);
  });

  return Object.values(questions);
}


}
