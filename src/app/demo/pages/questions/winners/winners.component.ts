import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  constructor(private router:Router, private service:QuestionsService) { }
  winners:any[] =[];
  @Input()
  selector:any
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  ngOnInit(): void {
    this.GetWinners();
  }
  onPageIndexChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.GetWinners();
  }

  GetWinners(): void {
    this.service.GetWinners(this.currentPage, this.pageSize).subscribe((winners:any)=>{
      this.winners = winners.Data
      this.totalItems = winners.TotalItems;
    });
  }

  Back():void{
   this.router.navigate(['basic/questions'])
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
}
