import { Component, OnInit } from '@angular/core';
import { SupportChartData1 } from './chart/support-chart-data-1';
import { SupportChartData2 } from './chart/support-chart-data-2';
import { SeoChart1 } from './chart/seo-chart-1';
import { SeoChart2 } from './chart/seo-chart-2';
import { SeoChart3 } from './chart/seo-chart-3';
import { PowerCardChart1 } from './chart/power-card-chart-1';
import { PowerCardChart2 } from './chart/power-card-chart-2';
import { DashboardService } from '../dashboard.service';
import {
  fade,
  slide,
} from '../../../theme/shared/animation-styles/animation-styles';
@Component({
  selector: 'app-dash-default',
  templateUrl: './dash-default.component.html',
  styleUrls: ['./dash-default.component.scss'],
  animations: [fade, slide],
})
export class DashDefaultComponent implements OnInit {
  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;
  count: number = 0;
  isStarted: boolean = false;
  ethiopianAlphabet:any =['ሀ','ለ','ሐ','መ','ሠ','ረ','ሰ','ቀ','በ','ተ','ኀ']
  active: any;
  questions: any[] = [];
  seconds: any;
  timeEnds: any;


  // Declare a property to store the interval ID
  interval: any;
  constructor(private service: DashboardService) {
    this.supportChartData1 = SupportChartData1.supportChartData;
    this.supportChartData2 = SupportChartData2.supportChartData;
    this.seoChartData1 = SeoChart1.seoChartData;
    this.seoChartData2 = SeoChart2.seoChartData;
    this.seoChartData3 = SeoChart3.seoChartData;
    this.powerCardChartData1 = PowerCardChart1.powerCardChartData;
    this.powerCardChartData2 = PowerCardChart2.powerCardChartData;
  }

  Next(): void {
    if (this.count < this.questions.length - 1 ) {
      this.count++;
    }
  }

  Back():void{
    if (this.count > 0 ) {
      this.count--;
    }
  }
  start(time:any):void{
    this.isStarted = true;
    this.countdownSeconds(time);

  }
  countdownSeconds(seconds) {
   // Check if the parameter is a positive integer
  if (Number.isInteger(seconds) && seconds > 0) {
    // Set an interval to execute a function every second
    let interval = setInterval(() => {
      // Display the current value of seconds

      this.seconds = seconds;
      console.log(this.seconds);
      // Decrement seconds by one
      seconds--;
      // Check if seconds reached zero
      if (seconds === 0) {
        // Clear the interval and stop the countdown
        clearInterval(interval);
        console.log("Time's up!");
        this.timeEnds = "ጊዜው አልቋል!"
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
      console.log("🚀 ~ file: dash-default.component.ts:53 ~ DashDefaultComponent ~ this.service.GetEpisodeQuestions ~ this.questions:", this.questions)
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
      console.log("🚀 ~ file: dash-default.component.ts:46 ~ DashDefaultComponent ~ this.service.GetActive ~ this.active:", this.active)

    });

  }

  ngOnInit() {
    this.GetEpisodeQuestions();
    this.GetActive();
  }

}
