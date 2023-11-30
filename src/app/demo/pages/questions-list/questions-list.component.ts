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
  isReported:boolean = false;
  reports:any[] = [];
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

  labelSeasons(id):string{
    let filteredSeasons = this.seasons.filter(se => se.id == id);
    return filteredSeasons?filteredSeasons[0].name:'';
  }
  labelEpisodes(id):string{
    let filteredEpisodes = this.episodes.filter(ep => ep.id == id);
    return filteredEpisodes?filteredEpisodes[0].name:'';
  }

  transformData(data: any[]): any[] {
     let list:any[] = [];
   // for(let i = 0; i < data.length; i++) {
      list.push({
        'ጥያቄዎች': "dadas",
        'ግዜ':  "asdad",
        'ምዕራፍ':"dasd",
        'ክፍል':"dsdd"
        // Add other columns as needed
      });
        
  //  }
    return list;
    // return data.map((item) => {
    //   return {
    //     'ጥያቄዎች': item.question_label,
    //     'ግዜ':item.time,
    //     'ምዕራፍ':this.labelSeasons(item.season_id),
    //     'ክፍል':this.labelEpisodes(item.episode_id)
    //     // Add other columns as needed
    //   };
    // });
  }
  GetQuestions(season_Id:any, episode_id:any):void{
    this.Questions_List = [];
    this.listOfData = [];
    this.service.GetQuestions(season_Id,episode_id).subscribe((response:any)=>{
      this.Questions_List = response;
    
      let Q:any[]=[];
      for(let i=0; i<this.Questions_List.length; i++){
        this.SetRow(this.Questions_List[i]);
        this.reports.push({
          'ጥያቄዎች': this.Questions_List[i].question_label,
          'ግዜ':  `${this.Questions_List[i].time}`,
          'ምዕራፍ':this.labelSeasons(this.Questions_List[i].season_id),
          'ክፍል':this.labelEpisodes(this.Questions_List[i].episode_id)
          // Add other columns as needed
        });
      }
      
     
    });
   
  }

 GetEpisodes(season_Id:any,type:number): void {
  this.service.GetEpisodes(season_Id).subscribe((response: any) => {
    this.episodes = response;
    if (this.episodes.length > 0) {
      let filteredEpisodes = this.episodes.filter(se => se.status == 1);
      this.selectedEpisodes = filteredEpisodes[0].id;
      this.GetQuestions(season_Id,this.selectedEpisodes );
    }
    if(type ==1){

    }
  });
}

GenerateReport():void{

  this.reportData = this.reports;
  this.isReported = true;
  // this.GetQuestions(this.selectedSeason,this.selectedEpisodes);
}

 changeSeason(event:any):void{
  this.GetEpisodes(event,0);
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
      this.GetEpisodes(this.selectedSeason,0);

    }

  });

}

changeEpisodes(event:any):void{
  this.selectedEpisodes = event;
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
