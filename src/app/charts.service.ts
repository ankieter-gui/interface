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
import {ColorsGenerator} from './ColorsGenerator';
import {SummaryChartGenerator} from './SummaryChartGenerator';
import {MultipleBarsWithOwnDataChartGenerator} from './MultipleBarsWithOwnDataChartGenerator';
import {GroupedSummaryChartGenerator} from './GroupedSummaryChartGenerator';

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

    return [list.map(d => d.replace(prefix, '')), prefix];
  }

  getGenerator(series, chartElement: ChartReportElement, namingDictioanry, reportService, dictionaryOverrides, localOverrides = undefined) {
    let strategyType = {
      'groupedBars': FrequencyChartGenerator,
      'multipleBars': MultipleBarsChartGenerator,
      'groupedPercentAndData': GroupedPercentAndDataChartGenerator,
      'multipleChoice': MultipleChoiceChartGenerator,
      'multipleBarsOwnData':MultipleBarsWithOwnDataChartGenerator,
      'linearCustomData': LinearCustomDataChartGenerator,
      'summary': SummaryChartGenerator,
      'groupSummary':GroupedSummaryChartGenerator,
    }[chartElement.config.type];
    console.log(chartElement.config.type)
    return [strategyType, new strategyType(series, chartElement, namingDictioanry, this.reportService, dictionaryOverrides)];
  }

  generateChart(series: any, chartElement: ChartReportElement, reportId, namingDictioanry, dictionaryOverrides, localOverrides = undefined): EChartsOption {

    let [strategyType, strategy] = this.getGenerator(series, chartElement, namingDictioanry, this.reportService, dictionaryOverrides, localOverrides);
    strategy.generate();
    strategy.getAllCount(reportId);
    console.log(strategy.allAnswers);
    chartElement.generator = strategy;
    let generator = new ColorsGenerator(chartElement, strategyType, strategy);

    return generator.generateColors(strategy.asJSONConfig());


  }
}
