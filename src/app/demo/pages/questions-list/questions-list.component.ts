import { Component, OnInit } from '@angular/core';
import { QuestionsListService } from './questions-list.service';
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
  i=0;
  ngOnInit() {
    this.GetQuestions();
  }

 GetQuestions():void{
  this.service. GetQuestions().subscribe((sub:any)=>{


    for(let i=0; i< sub.length; i++){
      this.SetRow(sub[i]);
    }
  });
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
