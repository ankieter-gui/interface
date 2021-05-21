import { Injectable } from '@angular/core';
import {ChartReportElement} from './dataModels/ReportElement';
import {EChartsOption} from 'echarts';
import * as Chance from 'chance'
@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  presetsToTypes={
    'groupedPercentAndData':'bar', 'multipleChoice':'bar', 'multipleChoiceAndData':'bar', 'multipleBars':'bar', 'groupedBars':'bar', 'complex':'bar'
  }
  defaultColorPalette = ["#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600"]

  fiveColorPalette=[
    "#c01f50","#cc5a29","#bb900c", "#92bf42", "#37e79a", "#9F9F9F"
  ]
  sevenColorPalette=[
    "#c01f50","#cc5a29","#bb900c","#CAF259", "#92bf42", "#37e79a","#59B0F2", "#9F9F9F"
  ]
  lengthsToPalettes = {
    1:this.fiveColorPalette,
    5:this.fiveColorPalette,
    7:this.sevenColorPalette
  }
  constructor() { }
  generateShareSeries(shareRawData){
    console.log(shareRawData)
    let sums = shareRawData.map(d=>
      Object.values(d).reduce((p:number,c:number,i,a)=>p+c)
    )
    return shareRawData.map(d=>Object.values(d))
  }

  generateChart(series:any, chartElement:ChartReportElement, include:string[]=undefined):EChartsOption{
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices = series["index"]
    var values = Object.assign({}, series);
    delete values['index'];
    let shareElement=zip(Object.keys(values), Object.values(values)).filter(d=>d[0].includes("share"))[0][1]
    let shareSeries = this.generateShareSeries(shareElement)
    console.log(shareSeries)
    if (chartElement.config.type=='groupedPercentAndData'){
      return {
        color:"#3b3b3b",
        legend:{
          data: Object.keys(shareSeries)
        },
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true, scale:true},
        yAxis:{type:'category', show:true, data:indices},
        series:shareSeries.map((d,index)=>({
          data:d,
          label:"a",
          type:this.presetsToTypes[chartElement.config.type],
          color:this.lengthsToPalettes[d.length][index],
          stack: 'total',
          smooth: false,
          symbol: 'none',
        }))
      }


    }
    // if (include)
    //   values = Object.fromEntries(
    //     Object.entries(values)
    //       .filter(([key]) => include.includes(key))
    //   )
    return {
      color:"#3b3b3b",
      grid:{left:50,top:25,right:25,bottom:25, show:true},
      xAxis:{type:'category', show:true, animation:true, scale:true},
      yAxis:{type:'value', show:true},
      series:zip(Object.keys(values), Object.values(values)).map((d,index)=>({
        data:zip(indices,d[1]),
        label:d[0],
        type:this.presetsToTypes[chartElement.config.type],
        color:this.defaultColorPalette[index],
        smooth: false,
        symbol: 'none',
      }))
    }
  }
}
