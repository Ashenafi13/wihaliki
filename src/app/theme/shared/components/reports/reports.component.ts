import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WebdatarocksComponent, WebdatarocksPivotModule } from 'ng-webdatarocks';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('pivot1', { static: false }) child!: WebdatarocksComponent;
  @ViewChild('pivot1') _child: WebdatarocksPivotModule;

  constructor() { }
  @Input()
  data:any;


  ngOnInit(): void {
  }
  getData(): void {
    this.onReportComplete(this.data);
    // this.reportService.getReportData().subscribe((list) => {
    //   const transformedList = this.transformData(list);
    //   this.onReportComplete(transformedList);
    // });
  }

  customizeToolbar(toolbar: any): void {
    const toolbarElements = toolbar.getTabs();

    const elementsToRemove = ['Open', 'Save', 'Connect'];

    for (const elementName of elementsToRemove) {
      const element = toolbarElements.find((e: any) => e.id === elementName);
      if (element) {
        toolbar.removeTab(element);
      }
    }

    toolbar.addButton({
      id: 'custom-button',
      label: 'Custom Button',
      handler: () => {
        alert('Custom button clicked!');
      },
    });
  }
  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log('[ready] WebdatarocksPivotModule', this.child);
  }

  onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.CellData): void {
    if (data.measure === 'Revenue') {
      (cell.style as any).color = '#00FF00'; // Change font color for the "Revenue" measure
    }
  }




  onReportComplete(list: any): void {
    this.child.webDataRocks.off('reportcomplete');
    // this._child.webDataRocks.setOptions({
    //   grid: {
    //     showTotals: "off"
    //   }
    // });


    const reportConfig: any = {
      dataSource: {
        data: list,
      },
      localization: './assets/custom-localization.json',
      toolbar: true,
      customizeToolbar: this.customizeToolbar,
    };

    this.child.webDataRocks.setReport(reportConfig);
  }
}
