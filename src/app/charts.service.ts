import { Injectable } from '@angular/core';
import {ChartReportElement} from './dataModels/ReportElement';
import {EChartsOption} from 'echarts';
import * as Chance from 'chance'
@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  colorPalette = []
  constructor() { }
  generateChart(series:{string:any[]}, chartElement:ChartReportElement):EChartsOption{
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices = series["index"]
    var values = Object.assign({}, series);
    delete values['index'];
    return {
      color:"#3b3b3b",
      grid:{left:25,top:25,right:25,bottom:25, show:true},
      xAxis:{type:'category', show:true, animation:true, scale:true},
      yAxis:{type:'value', show:true},
      series:zip(Object.keys(values), Object.values(values)).map(d=>({
        data:zip(indices,d[1]),
        label:d[0],
        type:chartElement.config.type,
        color:'#009063',
        smooth: false,
        symbol: 'none',
      }))
    }
  }
}
