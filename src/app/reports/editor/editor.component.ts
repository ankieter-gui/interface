import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  mockChartResponseData = {};
  get sortedElements(){
    return this.reportDefinition.elements.sort((s,d)=>s.order-d.order)
  }

  reportDefinition = { title:"", elements:[
      {order: 0, type:"text", content:{text: "<h1>Header 1</h1>Raport testowy o pieczeniu <b>ciastek</b>"}},
      {order:1, type:"chart", content: {
        dataQuery:{},
          config:{
            type:"bar",
            orientation:"vertical",
          }
        }}
    ]};
  queryData(charData){
    return this.mockChartResponseData;
  }
  generateChart(chartData, config){
    return "chart content"
  }

  constructor() { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
