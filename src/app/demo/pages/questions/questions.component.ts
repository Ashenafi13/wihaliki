
import { QuestionsService } from './questions.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  fade,
  slide,
} from '../../../theme/shared/animation-styles/animation-styles';
import { Subject } from 'rxjs';

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

  constructor(private service: QuestionsService) { }

  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;
  @ViewChild('myDiv') myDiv: ElementRef;
  count: number = 0;
  isStarted: boolean = false;
  alphabet: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  active: any;
  questions: any[] = [];
  seconds: any;
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
  ranks: any[] = [];


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
      localStorage.setItem('storedCount', `${this.count}`);
      localStorage.setItem('QId', this.questions[this.count].qts.id);
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

  test(QId: any): void {
      this.SendMessage(3);
  }


  start(time: any, QId: any): void {
    this.isStarted = true;
    this.isCountStarted = true;
    this.statusControllers = true;
    localStorage.removeItem('QId');
    localStorage.removeItem('STORED_SECONDES');
    localStorage.setItem('QId', QId);
    this.UpdateQuestionsStart(QId);
    this.countdownSeconds(time,QId);
  }

  checkQuestionStatus(isStarted: any) {
    this.isPreviouslyStarted = isStarted ? true : false;
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

  SendMessage(id:any) {

    this.service.SendSMS(id).subscribe((response: any) => {

    });


  }
  generate_phone_number() {
    // Generate a random 8-digit number
    var number = Math.floor(Math.random() * 90000000) + 10000000;
    // Add the country code +2519 as a prefix
    var phone_number = "+2519" + number.toString();
    // Return the phone number as a string
    return phone_number;
  }


  generate_letter() {
    // Create an array of letters from A to E
    var letters = ["A", "B", "C", "D", "E"];
    // Generate a random index from 0 to 4
    var index = Math.floor(Math.random() * 5);
    // Return the letter at the random index
    return letters[index];
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


  countdownSeconds(seconds: any, QId: any) {
    // Check if the parameter is a positive integer
    if (Number.isInteger(seconds) && seconds > 0) {
      // Set an interval to execute a function every second
      let interval = setInterval(() => {
        // Display the current value of seconds

        this.seconds = seconds;

         this.AddCompetitor(QId);
        localStorage.setItem('STORED_SECONDES', seconds);

        // Decrement seconds by one
        seconds--;


        // Check if seconds reached zero
        if (seconds === 0) {
          // Clear the interval and stop the countdown
          clearInterval(interval);
          this.AddCompetitor(QId);
          this.timeEnds = "ጊዜው አልቋል!"
          localStorage.removeItem('STORED_SECONDES');
          this.isCountStarted = false;
          this.GetEpisodeQuestions();



        }
      }, 1000); // 1000 milliseconds = 1 second
    } else {
      // Invalid parameter, throw an error
      throw new Error("Invalid parameter: seconds must be a positive integer");
    }
  }




  GetEpisodeQuestions(): void {
    this.service.GetEpisodeQuestions().subscribe((data) => {
      let Q = this.reformatArray(data);
      this.questions = Q;
      let QId = localStorage.getItem('QId');
      if (!QId) {
        this.GetCompetitor(Q[0]);
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
    let QId = localStorage.getItem('QId');
    if (QId) {
      this.GetCompetitor(QId);
    }
    let storedCount = localStorage.getItem('storedCount');
    if (storedCount) {
      this.count = Number(storedCount);
    }

    let STORED_SECONDES = localStorage.getItem('STORED_SECONDES');

    if (STORED_SECONDES || Number(STORED_SECONDES) > 1) {
      this.isStarted = true;
      this.seconds = Number(STORED_SECONDES);
      this.countdownSeconds(this.seconds, QId);

    }
  }
}
