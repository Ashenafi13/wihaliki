import { Component, OnInit,ViewChild, OnDestroy ,ElementRef } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DashboardService } from '../dashboard.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
@Component({
  selector: 'app-dash-default',
  templateUrl: './dash-default.component.html',
  styleUrls: ['./dash-default.component.scss'],


})
export class DashDefaultComponent implements OnInit {
  visible = false;
  placement: NzDrawerPlacement = 'top';
  public minutes: number = 0;
  public seconds: number = 0;
  @ViewChild('countdown') countdown;
  mobile: Observable<boolean>;
  showText = false;
  @ViewChild('counter') textEl: ElementRef;
  slideUpState = 'shown';
  isTimerFinished = false;
  @ViewChild('myDiv') myDiv: ElementRef;
  isTimerRunning:number =0;
  COUNTER_SECONDE = 'COUNTER_SECONDE';
  COUNTER_MINUTE ='COUNTER_MINUTE';
  time = new Date();
  rxTime = new Date();
  _intervalId;
  subscription: Subscription;
  isEpisodeCompleted = false;
  competitors:any[] =[];
 constructor(private service:DashboardService,breakpointObserver: BreakpointObserver,private elementRef: ElementRef,private cookieService: CookieService){
  this.mobile = breakpointObserver.observe([
    Breakpoints.HandsetPortrait
  ]).pipe(map(res => res.matches));
 }
  // The interval id for the countdown
  intervalId: any;
  startMinutes: number;
  animate = false;

  hoursStr:any;
  minutesStr:any;
  secondsStr:any
  period:any;

  animateText(): void {
    if(this.textEl){
    const textNative = this.textEl.nativeElement;

    textNative.classList.add('slides');

    textNative.addEventListener('animationend', () => {
      textNative.classList.remove('slides');
    });
  }
  }

  ngOnInit() {
    this.ActiveSeason()
    this.GetCompitator();
    this.getClockTime();

    //  localStorage.removeItem(this.COUNTER_SECONDE);
    //  localStorage.removeItem(this.COUNTER_MINUTE);

    let COUNTER_MINUTE = localStorage.getItem(this.COUNTER_MINUTE);
    let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);


    if(COUNTER_SECONDE && COUNTER_MINUTE){
       this.open()
    }


  }
  ngAfterViewInit() {
    if (this.myDiv) {
      this.myDiv.nativeElement.scrollTo();
    }

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

  ActiveSeason():void{
    this.service.GetActive().subscribe((result:any) => {
        this.startMinutes = result?.episodeStartTime;
        this.isEpisodeCompleted = result?.time_status?true:false;
    })
  }

  open(): void {
     this.isTimerFinished = false;
      this.UpdateStartTime();

  }

  // A function that returns the current time in 12-hour format
   getClockTime(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });

}
ngOnDestroy() {
  clearInterval(this._intervalId);
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}

  SendMessage(id:any) {

    this.service.SendSMS(id).subscribe((response: any) => {
        this.RegisterCompitator();
    });


  }


  close(): void {
    this.visible = false;
    this.ActiveSeason();
  }

  UpdateStartTime():void{
    this.service.UpdateStartTime().subscribe((result:any) => {
      this.startCountdown(this.startMinutes);
    });
  }

  RegisterCompitator():void{
    this.service.RegisterCompitator().subscribe((result:any) => {
        this.GetCompitator();
        if (this.myDiv) {
          this.myDiv.nativeElement.scrollTop = this.myDiv.nativeElement.scrollHeight;
        }
    });
  }

  GetCompitator():void{
    this.service.GetCompitator().subscribe((result:any) => {
       this.competitors = result;
    });
  }


  startCountdown(minutes: number) {
   let COUNTER_MINUTE = localStorage.getItem(this.COUNTER_MINUTE);
   let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);


     this.minutes =  COUNTER_MINUTE?Number(COUNTER_MINUTE):minutes;
     this.seconds =  COUNTER_SECONDE?  Number(COUNTER_SECONDE):0;

    const interval = setInterval(() => {
      this.isTimerRunning = 1;
        this.SendMessage(1);
      // this.RegisterCompitator();
      if(this.minutes === 0 && this.seconds === 0) {
        clearInterval(interval);
        this.isTimerRunning = 2;
        localStorage.removeItem(this.COUNTER_MINUTE);
        localStorage.removeItem(this.COUNTER_SECONDE);
      } else if(this.seconds === 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
       // this.animateText();
        this.seconds--;
      }
      if(this.seconds > 0){
      localStorage.setItem(this.COUNTER_MINUTE,`${this.minutes}`);
      localStorage.setItem(this.COUNTER_SECONDE, `${this.seconds}`);
      }

    }, 1000);
  }






}
