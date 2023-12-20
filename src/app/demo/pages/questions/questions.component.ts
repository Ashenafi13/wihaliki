
import { QuestionsService } from './questions.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  fade,
  slide,
} from '../../../theme/shared/animation-styles/animation-styles';
import { Subject } from 'rxjs';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Router } from '@angular/router';

interface DataItem {
  id: number;
  phone: string;
  totalAnswered: number;
  Rank: number;

}
@Component({
  selector: 'app-questions-page',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [fade, slide],
  providers: [
    DatePipe,
    // other providers
  ],
})
export class QuestionsComponent implements OnInit {

  constructor(private service: QuestionsService, private router: Router) { }

  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;
  @ViewChild('myDiv') myDiv: ElementRef;
  count: number = 0;
  count_answer: number = 0;
  isStarted: boolean = false;
  alphabet: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  active: any;
  questions: any[] = [];
  isPreviouslyStarted: boolean
  timeEnds: any;
  tempTest:number = 0;
  private scrollSubject = new Subject();
  isCountStarted: boolean;
  correctAnswers: any[] = [];
  IncorrectAnswers: any[] = [];
  competitors: any[] = [];
  statusControllers: boolean;
  finalResults: boolean = false;
  testSender:any;
  testMsg:any;
  percent:any;;
  visible = false;
  visible_answer = false;

  placement: NzDrawerPlacement = 'top';
  ranks: any[] = [];
  public minutes: number = 0;
  public seconds: number = 0;
  isTimerRunning:number = 0;
  COUNTER_SECONDE = 'COUNTER_SECONDE_Q';
  COUNTER_MINUTE ='COUNTER_MINUTE_Q';
  listOfColumn = [
    {
      title: 'ተወዳዳሪ'
    },
    {
      title: 'ጠቅላላ የተመለሱ ጥያቄዎች',
      compare: (a: DataItem, b: DataItem) => a.totalAnswered - b.totalAnswered,
      priority: 3
    },
    {
      title: 'ደረጃ',
      compare: (a: DataItem, b: DataItem) => a.Rank - b.Rank,
      priority: 2
    }

  ];
  listOfData: DataItem[];
  // Declare a property to store the interval ID
  interval: any;

  Next(): void {
    this.statusControllers = false;
    this.timeEnds = '';
    this.isCountStarted = false;
    this.isStarted = false;
    if (this.count < this.questions.length - 1) {
      this.count++;
      console.log(this.count);
      localStorage.setItem('storedCount', `${this.count}`);

      this.GetCompetitor(this.questions[this.count].qts.id);
      this.finalResults = false;
    } else {
      this.finalResults = true;
      this.GetCompetitorRank();
    }

  }

  Back(): void {
    this.statusControllers = false;
    this.timeEnds = '';
    this.isCountStarted = false;
    this.isStarted = false;
    if (this.count > 0) {
      this.count--;
      localStorage.setItem('storedCount', `${this.count}`);
      localStorage.setItem('QId', this.questions[this.count].qts.id);
      this.GetCompetitor(this.questions[this.count].qts.id);
    }
  }

  Next_Answer():void{
   if(this.count_answer < this.questions.length - 1){
    this.count_answer++;
   }
  }
  Back_Answer():void{
    if(this.count_answer > 0){
      this.count_answer--;
     }
  }
  GetCompetitorRank() {
    this.listOfData = [];
    this.ranks = [];
    this.service.GetCompetitorRank().subscribe((rank: any) => {
      for (let i = 0; i < rank.length; i++) {
        this.ranks.push({
          id: rank[i].id,
          phone: rank[i].phone,
          totalAnswered: rank[i].totalAnswered,
          Rank: rank[i].Rank
        })
      }

      this.listOfData = [...this.ranks]

    });
  }
  alloverResults(): void {
    this.GetCompetitorRank();

  }

  reset(): void {
    location.reload();
  }



  open(): void {
    this.visible = true;
    this.competitors = [];
    this.correctAnswers = [];
    this.IncorrectAnswers =[];
    let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);
    let QId = localStorage.getItem('QId');
    if(COUNTER_SECONDE){
      this.startCountdown(0,QId);
    }
  }

  close(): void {
    this.visible = false;

  }

  open_Answer(): void {
    this.visible_answer = true;

  }

  close_Answer(): void {
    this.visible_answer = false;

  }

  start(time: any, QId: any): void {
    // this.open();

    this.isStarted = true;
    this.isCountStarted = true;
    this.statusControllers = true;

     localStorage.removeItem('QId');
    // localStorage.removeItem('STORED_SECONDES');
     localStorage.setItem('QId', QId);
    // this.GetCompetitor(QId)
      this.UpdateQuestionsStart(QId);
      this.startCountdown(time, QId);

  }

  checkQuestionStatus(isStarted: any,index) {
    if(this.count == index){
      this.isPreviouslyStarted = isStarted ? true : false;
    }
  }


  GoToWinners(){
    this.router.navigate(['basic/questions/winners']);
  }

  ngAfterViewInit() {
    if (this.myDiv) {
      this.myDiv.nativeElement.scrollTo();
    }

  }

  UpdateQuestionsStart(QId: any) {
    this.service.UpdateQuestionsStart(QId).subscribe((response: any) => {
      this.UpdateQuestionsStatus(QId);
    });
  }

  AddCompetitor(QId: any) {
    this.service.AddCompetitor(QId).subscribe((result: any) => {
      this.GetCompetitor(QId);
      if (this.myDiv) {
        this.myDiv.nativeElement.scrollTop = this.myDiv.nativeElement.scrollHeight;
      }
      localStorage.removeItem('STORED_SECONDES');
    });
  }

  RegisterCompetitor(phone: string) {
    let data = {
      phone: phone
    }
    this.service.RegisterCompetitor(data).subscribe((x: any) => {
      console.log(x);
    });
  }

  SendMessage(id:any,QId:string) {

    this.service.SendSMS(id).subscribe((response: any) => {
      this.AddCompetitor(QId);
    });


  }


  UpdateQuestionsStatus(QId: any) {
    this.service.UpdateQuestionsStatus(QId).subscribe((response: any) => {
      if (response == 1) {
        this.GetEpisodeQuestions();
      }
    });
  }

  GetCompetitor(QId: any) {
    this.service.GetCompetitor(QId).subscribe((response: any) => {
      this.correctAnswers = response.filter(x => x.answer == 1);
      this.IncorrectAnswers = response.filter(x => x.answer == 0);
      this.competitors = response;

    });
  }





  startCountdown(seconds: number,QId: any) {

    let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);
    this.seconds =  COUNTER_SECONDE?  Number(COUNTER_SECONDE):seconds;
    const interval = setInterval(() => {
      this.isTimerRunning = 1;

         this.SendMessage(1,QId);
         //this.AddCompetitor(QId);

      localStorage.setItem('STORED_SECONDES',  `${this.seconds}`);
      if(this.seconds === 0) {
        clearInterval(interval);
        this.isTimerRunning = 2;
        this.AddCompetitor(QId);
        this.timeEnds = "ጊዜው አልቋል!"
        localStorage.removeItem('STORED_SECONDES');
        this.isCountStarted = false;
        localStorage.removeItem(this.COUNTER_SECONDE);
         this.GetEpisodeQuestions();
         this.GetCompetitor(QId);

      } else {
       // this.animateText();
        this.seconds--;
        this.percent = (this.seconds / seconds) * 100;
      }
      if(this.seconds > 0){
        localStorage.setItem(this.COUNTER_SECONDE, `${this.seconds}`);
        }

    }, 1000);
  }
  hide_phone_number(phone_number: string): string {
    // // check if the phone number is valid

    // split the phone number into parts
    let country_code = phone_number.slice(0, 4); // +251
    let area_code = phone_number.slice(4, 6); // 92
    let prefix = phone_number.slice(6, 10); // 031X
    let suffix = phone_number.slice(10); // XXXX

    // replace some of the digits with asterisks
    let hidden_prefix = prefix.slice(0, 3) + "*"; // 031*
    let hidden_suffix = "*".repeat(suffix.length); // ****

    // join the parts together
    let hidden_phone_number = country_code + area_code + hidden_prefix + hidden_suffix; // +25192031*****

    // return the hidden phone number
    return hidden_phone_number;
}

  formatTime(percent, successPercent) {
    return `${this.seconds} s`;
     // return the remaining time in seconds
  }


  GetEpisodeQuestions(): void {
    this.service.GetEpisodeQuestions().subscribe((data) => {
      let Q:any = this.reformatArray(data);
      this.questions = Q;

      if(this.count){
      this.GetCompetitor(Q[this.count]?.qts.id);
      }else{
        this.GetCompetitor(Q[0]?.qts.id);
      }
    });
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
  GetActive(): void {
    this.service.GetActive().subscribe((data: any) => {
      this.active = data;


    });

  }

  ngOnInit() {
    this.GetEpisodeQuestions();
    this.GetActive();

    let storedCount = localStorage.getItem('storedCount');
    if (storedCount) {
      this.count = Number(storedCount);
    }
    let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);
    let QId = localStorage.getItem('QId');
    if(COUNTER_SECONDE){
      this.startCountdown(0,QId);
    }


  }

}
