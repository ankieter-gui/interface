import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ReportDefinition} from '../../dataModels/ReportDefinition';
import {ChartTypes} from '../../dataModels/ReportElement';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  mockChartResponseData = {};
  mouseHoveringAddMorePanel=false;


  reportDefinition:ReportDefinition = { title:"", elements:[
      { type:"text", content:{text: "<h1>Header 1</h1>Raport testowy o pieczeniu <b>ciastek</b>"}},
      {type:"chart", content: {
        dataQuery:{},
          config:{
            type:ChartTypes.bar,
            orientation:"vertical",
          },
          text:"",
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
