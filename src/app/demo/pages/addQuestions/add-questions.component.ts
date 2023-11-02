import { Component, OnInit } from '@angular/core';
import { AddQuestionsService } from './add-questions.service';
import { NzNotificationService } from 'ng-zorro-antd';

interface ItemData {
  id: string;
  question: string;
  time: number;
  QId: number;
}
@Component({
  selector: 'app-app-questions-page',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions .component.scss']
})
export class AddQuestionComponent implements OnInit {
  selectedChoices: any[] = [];
  question: any;
  checkedAnswer: any[] = [];
  seasons: any[] = [];
  episodes: any[] = [];
  selectedSeason: any;
  selectedEpisodes: any;
  timeTaken: any;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  Questions_List:any[] =[];
  choices_list: any[] = [];
  constructor(private service: AddQuestionsService,  private notification: NzNotificationService) { }
  choices: any[] = [];
  i = 0;
  startEdit(id: string): void {
    this.editId = id;
  }
  stopEdit(): void {
    this.editId = null;
  }
  GetSeasons(): void {
    this.service.GetSeasons().subscribe((response: any) => {
      this.seasons = response;
      if (this.seasons.length > 0) {
        let filteredSeasons = this.seasons.filter(se => se.status == 1);
        this.selectedSeason = filteredSeasons[0].id;
      }

    });
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
  GetEpisodes(): void {
    this.service.GetEpisodes().subscribe((response: any) => {
      this.episodes = response;
      if (this.episodes.length > 0) {
        let filteredEpisodes = this.episodes.filter(se => se.status == 1);
        this.selectedEpisodes = filteredEpisodes[0].id;
      }
    });
  }



  ngOnInit() {
    this.GetSeasons();
    this.GetEpisodes();
    this.GetQuestions()
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
  AddChoices(): void {
    this.choices.push({
      id:0,
      choice_label:'',
      isAnswer:false,
      question_id:0
    });
  }
  GetChoices(QId:any): void {
    this.choices_list=[];
    this.choices = [];
    this.service.GetChoices(QId).subscribe((data:any) => {
      this.choices_list = data;
      for(let i=0; i<this.choices_list.length; i++){
        this.choices.push({
          id: this.choices_list[i].id,
          choice_label:this.choices_list[i].choice_label,
          isAnswer:this.choices_list[i].isAnswer?true:false,
          question_id:this.choices_list[i].question_id
        })
      }
    });
  }

  deleteRow(id:any,QId:any){
    this.service.DeleteChoices(id).subscribe((response:any)=>{
      if(response == 1){
        this.GetChoices(QId);
      }else{

      }
     });
  }
  updateRow(choice:any,isAnswer:any,id:any,QId:any){
    let data = {
      choice_label: choice,
      isAnswer:isAnswer?1:0,
     }
     console.log(data);
    this.service.UpdateChoices(data,id).subscribe((response:any)=>{
      if(response == 1){
        this.GetChoices(QId);
      }else{

      }
     });
  }

  saveRow(choice:any,isAnswer:any,QId:any): void{
   let data = {
    choice_label: choice,
    isAnswer:isAnswer?1:0,
    question_id:QId
   }

   this.service.AddChoices(data).subscribe((response:any)=>{
    if(response == 1){
      this.GetChoices(QId);
    }else{

    }
   });

  }
  RemoveChoices(index: any): void {
    this.choices.splice(index, 1);

  }
  createNotification(type: string, title: string, subTitle: string): void {
    this.notification.create(type, title, subTitle);
  }
  GetQuestions():void{
    this.service.GetQuestions().subscribe((response:any)=>{
      this.Questions_List = response;
      let Q:any[]=[];
      for(let i=0; i<this.Questions_List.length; i++){
        this.SetRow(this.Questions_List[i]);
      }

    });
  }




  submit(): void {

    let data = {
      episode_id:this.selectedEpisodes,
      question_label:this.question,
      season_id:this.selectedSeason,
      time:this.timeTaken,
    }
    this.service.AddQuestions(data).subscribe((response)=>{
      if(response == 1){
        this.createNotification('success','info','successfully added!!');
        this.GetQuestions();
      }else{
        this.createNotification('error','info','something happened wrong!!');
      }
    });
  }
}