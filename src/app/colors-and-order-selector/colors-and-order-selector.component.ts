import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChartReportElement} from '../dataModels/ReportElement';

@Component({
  selector: 'app-colors-and-order-selector',
  template: `
    <div cdkDropList cdkDropListOrientation="horizontal" class="example-list" (cdkDropListDropped)="drop($event)">
      <div class="example-box" *ngFor="let label of order" cdkDrag>{{label}}</div>
    </div>

  `,
  styles: []
})
export class ColorsAndOrderSelectorComponent implements OnInit {
  allLabels: any[];
  order = [];
  @Input()
  chart: ChartReportElement;

  constructor() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.order, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.allLabels = this.chart.generator.getAllShareLabels(this.chart.generator.shareElement);
    console.log(this.allLabels);
  }

}
