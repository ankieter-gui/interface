import { Injectable } from '@angular/core';
import {ChartReportElement} from './dataModels/ReportElement';
import {EChartsOption} from 'echarts';
import * as Chance from 'chance'
import * as lcs from 'node-lcs';

import {commonSubstring} from './lcs';
import {SeriesLabelOption} from 'echarts/types/src/util/types';
import {ReportsService} from './reports.service';
import {share} from 'rxjs/operators';
import {FrequencyChartGenerator} from './FrequencyChartGenerator';
import {AbstractChartGenerator} from './AbstractChartGenerator';
import {MultipleChoiceChartGenerator} from './MultipleChoiceChartGenerator';
import {GroupedPercentAndDataChartGenerator} from './GroupedPercentAndDataChartGenerator';
import {MultipleBarsChartGenerator} from './MultipleBarsChartGenerator';
import {LinearCustomDataChartGenerator} from './LinearCustomDataChartGenerator';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  presetsToTypes = {
    'groupedPercentAndData': 'bar',
    'multipleChoice': 'bar',
    'multipleChoiceAndData': 'bar',
    'multipleBars': 'bar',
    'groupedBars': 'bar',
    'complex': 'bar'
  };
  defaultColorPalette = ['#003f5c',
    '#58508d',
    '#bc5090',
  "#ff6361",
  "#ffa600"]
  numberToStringScale = {
    5 : 'bardzo dobrze', 4:'raczej dobrze', 3:'średnio', 2:'raczej źle', 1:'bardzo źle'
  }
  getNumberToStringScale(n){
    console.log(n)
    if ( Number(n) in this.numberToStringScale) return this.numberToStringScale[Number(n)]
    else return n
  }
  fourColorPalette=[
    "#F46D43","#FEE08B","#D8EE8A", "#66BD63", "#078202", "#9F9F9F"
  ]
  fiveColorPalette=[
    "#F46D43","#FEE08B","#FDFEBD", "#D8EE8A", "#66BD63", "#078202", "#9F9F9F"
  ]
  graySubstrings = ["brak zmian"]
  darkGraySubstrings = ["nie wiem", "nie dotyczy"]
  gray="#9F9F9F"
  darkGray="#5e5e5e"
  lightBlue="#1e6adb"
  darkBlue="#043b8b"
  horizontalBarHeight=40;

  rateToColorGrade(index,n){

    if (n==undefined) return this.darkGray
    let y = {
      'bardzo dobrze': "#4AAF5B",
      'raczej dobrze':"#B7E075",
      'średnio':"#FDFEBD",
      'raczej źle':"#FDBE6F",
      'bardzo źle':"#E95638",
      "tak":"#4AAF5B",
      "nie":"#E95638",
      "pominięto":this.darkGray,
      'odmowa odpowiedzi':this.darkGray
    }
    if (n.toLowerCase() in y) return y[n.toLowerCase()]
    else {
      if (this.graySubstrings.some(v=>n.toLowerCase().includes(v))){
        return this.gray
      }
      if (this.darkGraySubstrings.some(v=>n.toLowerCase().includes(v))){
        return this.darkGray
      }
      if (index<this.fourColorPalette.length-1)
      return this.fourColorPalette[index]
      else
        return Chance().color()
    }
  }
  sevenColorPalette=[
    "#c01f50","#cc5a29","#bb900c","#CAF259", "#92bf42", "#37e79a","#59B0F2", "#9F9F9F"
  ]
  lengthsToPalettes = {
    1:this.fiveColorPalette,
    5:this.fiveColorPalette,
    7:this.sevenColorPalette
  }
  getAllShareLabels(shareElement){
    let l = []
    for (let series of shareElement){
      l= [...l, ...Object.keys(series)]
    }
    return [...new Set(l)];
  }
  constructor(private reportService:ReportsService) { }

   zip = (a, b) => a.map((k, i) => [k, b[i]]);
  transformDataIntoPairs(series,remove9999=false){
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices = series["index"]
    var values = Object.assign({}, series);
    delete values['index'];
    if (remove9999){
      let indicesOfDefaultValues = indices.map((d,i)=>[d,i]).filter(d=>d[0]==999 || d[0]==9999).map(d=>d[1])
      for (let key in values){

        let res:[] = values[key].filter((d,i)=>!indicesOfDefaultValues.includes(i))
        values[key]=res;
      }
    }

    return zip(Object.keys(values), Object.values(values))
  }
  generateSeriesList(shareElement:object[]){
    let resultingMap={}
    let allKeys = this.getAllShareLabels(shareElement)
    for (let valuesMap of shareElement){
      const sum = Object.values(valuesMap).reduce((previousValue:number, currentValue:number, index, array)=>previousValue + currentValue)
      for (let key of allKeys){
        let val =0;
        // console.log("key: "+key)
        if (key in valuesMap) val =valuesMap[key]/sum*100
        if (key in resultingMap){
          resultingMap[key].push(val)
        }else{
          resultingMap[key] = [val]
        }
      }
    }
    return resultingMap
  }
  transformIntoPercent(resultin){

  }


  sanitizeLabels(list) {
    if (list.length == 1) {
      return [list, ''];
    }
    const prefix = commonSubstring(list);
    console.log(prefix);
    return [list.map(d => d.replace(prefix, '')), prefix];
  }

  generateChart(series: any, chartElement: ChartReportElement, reportId, namingDictioanry): EChartsOption {
    let strategy: AbstractChartGenerator = new {
      'groupedBars': FrequencyChartGenerator,
      'multipleBars': MultipleBarsChartGenerator,
      'groupedPercentAndData': GroupedPercentAndDataChartGenerator,
      'multipleChoice': MultipleChoiceChartGenerator,
      'linearCustomData': LinearCustomDataChartGenerator
    }[chartElement.config.type](series, chartElement, namingDictioanry, this.reportService);
    strategy.generate();
    return strategy.asJSONConfig()


  }
}
