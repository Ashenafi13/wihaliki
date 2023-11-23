import { Component, OnInit,ViewChild, OnDestroy ,ElementRef, Renderer2 } from '@angular/core';
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
//   visible = false;
//   video: HTMLVideoElement | undefined;
//   placement: NzDrawerPlacement = 'top';
//   public minutes: number = 0;
//   public seconds: number = 0;
//   @ViewChild('countdown') countdown;
//   mobile: Observable<boolean>;
//   showText = false;
//   @ViewChild('counter') textEl: ElementRef;
//   slideUpState = 'shown';
//   isTimerFinished = false;
//   @ViewChild('myDiv') myDiv: ElementRef;
//   isTimerRunning:number =0;
//   COUNTER_SECONDE = 'COUNTER_SECONDE';
//   COUNTER_MINUTE ='COUNTER_MINUTE';
//   time = new Date();
//   rxTime = new Date();
//   _intervalId;
//   subscription: Subscription;
//   isEpisodeCompleted = false;
//   competitors:any[] =[];
//  constructor(private service:DashboardService,breakpointObserver: BreakpointObserver,private elementRef: ElementRef,private cookieService: CookieService){
//   this.mobile = breakpointObserver.observe([
//     Breakpoints.HandsetPortrait
//   ]).pipe(map(res => res.matches));
//  }
  
//   intervalId: any;
//   startMinutes: number;
//   animate = false;

//   hoursStr:any;
//   minutesStr:any;
//   secondsStr:any
//   period:any;

//   animateText(): void {
//     if(this.textEl){
//     const textNative = this.textEl.nativeElement;

//     textNative.classList.add('slides');

//     textNative.addEventListener('animationend', () => {
//       textNative.classList.remove('slides');
//     });
//   }
//   }

//   ngOnInit() {
//     this.ActiveSeason()
//     this.GetCompitator();
//     this.getClockTime();


  
//     let COUNTER_MINUTE = localStorage.getItem(this.COUNTER_MINUTE);
//     let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);


//     if(COUNTER_SECONDE && COUNTER_MINUTE){
//        this.open()
//     }


//   }
//   playVideo() {
//     const video = document.getElementById('video-background') as HTMLVideoElement | null;
//     console.log("🚀 ~ file: dash-default.component.ts:87 ~ DashDefaultComponent ~ playVideo ~ video:", video)

//     if (video) {
//       // Check if the video is paused to avoid errors on subsequent clicks
//       if (video.paused) {
//         video.play().catch(error => {
//           console.error('Error playing video:', error);
//         });
//       }
//     }
//   }

//   ngAfterViewInit() {
//     if (this.myDiv) {
//       this.myDiv.nativeElement.scrollTo();
//     }

//   }

//   hide_phone_number(phone_number: string): string {
//     // // check if the phone number is valid

//     // split the phone number into parts
//     let country_code = phone_number.slice(0, 4); // +251
//     let area_code = phone_number.slice(4, 6); // 92
//     let prefix = phone_number.slice(6, 10); // 031X
//     let suffix = phone_number.slice(10); // XXXX

//     // replace some of the digits with asterisks
//     let hidden_prefix = prefix.slice(0, 3) + "*"; // 031*
//     let hidden_suffix = "*".repeat(suffix.length); // ****

//     // join the parts together
//     let hidden_phone_number = country_code + area_code + hidden_prefix + hidden_suffix; // +25192031*****

//     // return the hidden phone number
//     return hidden_phone_number;
// }

//   ActiveSeason():void{
//     this.service.GetActive().subscribe((result:any) => {
//         this.startMinutes = result?.episodeStartTime;

//         this.isEpisodeCompleted = result?.time_status?true:false;
//     })
//   }

//   open(): void {
//      this.isTimerFinished = false;
//       this.UpdateStartTime();

//   }

//   // A function that returns the current time in 12-hour format
//    getClockTime(): void {
//     this.intervalId = setInterval(() => {
//       this.time = new Date();
//     }, 1000);

//     // Using RxJS Timer
//     this.subscription = timer(0, 1000)
//       .pipe(
//         map(() => new Date()),
//         share()
//       )
//       .subscribe(time => {
//         this.rxTime = time;
//       });

// }
// ngOnDestroy() {
//   clearInterval(this._intervalId);
//   if (this.subscription) {
//     this.subscription.unsubscribe();
//   }
// }

//   SendMessage(id:any) {

//     this.service.SendSMS(id).subscribe((response: any) => {
//         this.RegisterCompitator();
//     });


//   }


//   close(): void {
//     this.visible = false;
//     this.ActiveSeason();
//   }

//   UpdateStartTime():void{
//     this.service.UpdateStartTime().subscribe((result:any) => {
//       this.startCountdown(this.startMinutes);
//     });
//   }

//   RegisterCompitator():void{
//     this.service.RegisterCompitator().subscribe((result:any) => {
//         this.GetCompitator();
//         if (this.myDiv) {
//           this.myDiv.nativeElement.scrollTop = this.myDiv.nativeElement.scrollHeight;
//         }
//     });
//   }

//   GetCompitator():void{
//     this.service.GetCompitator().subscribe((result:any) => {
//        this.competitors = result;
//     });
//   }


//   startCountdown(minutes: number) {
//    let COUNTER_MINUTE = localStorage.getItem(this.COUNTER_MINUTE);
//    let COUNTER_SECONDE = localStorage.getItem(this.COUNTER_SECONDE);


//      this.minutes =  COUNTER_MINUTE?Number(COUNTER_MINUTE):minutes;
//      this.seconds =  COUNTER_SECONDE?  Number(COUNTER_SECONDE):0;

//     const interval = setInterval(() => {
//       this.isTimerRunning = 1;
//         this.SendMessage(1);
//       // this.RegisterCompitator();
//       if(this.minutes === 0 && this.seconds === 0) {
//         clearInterval(interval);
//         this.isTimerRunning = 2;
//         localStorage.removeItem(this.COUNTER_MINUTE);
//         localStorage.removeItem(this.COUNTER_SECONDE);
//       } else if(this.seconds === 0) {
//         this.minutes--;
//         this.seconds = 59;
//       } else {
//        // this.animateText();
//         this.seconds--;
//       }
//       if(this.seconds > 0){
//       localStorage.setItem(this.COUNTER_MINUTE,`${this.minutes}`);
//       localStorage.setItem(this.COUNTER_SECONDE, `${this.seconds}`);
//       }

//     }, 1000);
//   }


/********* Test countdown */


minutes: number = 2;
  seconds: number = 59;

  formattedMinutes: string[] = [];
  formattedSeconds: string[] = [];

  activeMinute: number | undefined;
  activeSecond: number | undefined;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.initializeFormattedTime();
    setInterval(() => this.updateClock(), 1000);
  }

  initializeFormattedTime() {
    this.formattedMinutes = this.formatTime(this.minutes);
    this.formattedSeconds = this.formatTime(this.seconds);
  }

  formatTime(time: number): string[] {
    return time.toString().padStart(2, '0').split('');
  }

  updateClock() {
    if (this.activeSecond === undefined) {
      this.activeSecond = this.seconds;
    } else {
      this.activeSecond--;
      if (this.activeSecond < 0) {
        this.activeSecond = this.seconds;
        if (this.activeMinute === undefined) {
          this.activeMinute = this.minutes - 1;
        } else {
          this.activeMinute--;
          if (this.activeMinute < 0) {
            // Reset the clock after 2 minutes
            this.activeMinute = this.minutes - 1;
            this.activeSecond = this.seconds;
          }
        }
      }
    }

    this.formattedMinutes = this.formatTime(this.activeMinute || 0);
    this.formattedSeconds = this.formatTime(this.activeSecond || 0);

    this.updateFlipEffect('minutePlay', this.activeMinute);
    this.updateFlipEffect('secondPlay', this.activeSecond);
  }

  updateFlipEffect(playClass: string, activeValue: number | undefined) {
    const activeElement = this.el.nativeElement.querySelector(`ul.${playClass} li.active`);
    if (activeElement) {
      this.renderer.removeClass(activeElement, 'active');
      this.renderer.addClass(activeElement, 'before');
    }

    const nextElement = this.el.nativeElement.querySelector(`ul.${playClass} li:nth-child(${activeValue! + 1})`);
    if (nextElement) {
      this.renderer.removeClass(nextElement, 'before');
      this.renderer.addClass(nextElement, 'active');
      this.renderer.addClass(document.body, 'play');
    }
  }
}
