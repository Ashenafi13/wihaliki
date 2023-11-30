import { Component, Input, OnInit,SimpleChanges,AfterViewInit,ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { WebdatarocksComponent, WebdatarocksPivotModule } from 'ng-webdatarocks';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ReportsComponent implements OnInit {
  @ViewChild('pivot1', { static: false }) child!: WebdatarocksComponent;
  @ViewChild('pivot1') _child: WebdatarocksPivotModule;

  constructor() { }
  @Input()
  data:any;
  @Input() key: any;
  ngOnInit(): void {}
  onReportComplete(): void {
   console.log(this.data);
    const reportConfig: any = {
      dataSource: {
        data: this.data,
      },
      
      options: {
        grid: {
          type: 'flat', // Set the grid type to 'flat' to remove subtotals and grand totals
          // showGrandTotal:'off',
          // showTotal:'off'
        },
      },
      global: {
      localization: 'assets/custom-localization.json',
      },
      toolbar: true,
    
    };
   
    console.log('Report Config:', reportConfig);
    this.child.webDataRocks.setReport(reportConfig);
  }

 
  ngAfterViewInit() {
    this.onReportComplete();
  }

}
