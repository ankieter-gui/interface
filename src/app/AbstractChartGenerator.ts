import {EChartsOption} from 'echarts';
import {ChartReportElement} from './dataModels/ReportElement';
import {Data} from '@angular/router';
import {ReportsService} from './reports.service';
import {commonSubstring} from './lcs';
import * as Chance from 'chance'
export interface DataPair{
  // [
  //   [
  //     "share W skali od 5 do 1 (5 - bardzo dobrze, 4 - raczej dobrze, 3 - średnio, 2 - raczej źle, 1 - bardzo źle) proszę ocenić następujące elementy dotyczące jakości zajęć: - Dostosowanie form pracy zdalnej do przekazywanych treści",
  //     [
  //       {
  //         "1": 5,
  //         "2": 8,
  //
  //       },
  //       {
  //         "1": 2,
  //         "2": 1,
  //
  //       },
  //       {
  //         "4": 1
  //       },
  //       {
  //         "1": 7,
  //         "2": 9,
  //
  //       }
  //     ]
  //   ]
  //   ]


}
export abstract class AbstractChartGenerator {
  horizontalBarHeight=40;
  gray="#9F9F9F"
  darkGray="#5e5e5e"
  lightBlue="#1e6adb"
  darkBlue="#043b8b"
  static valuesToOmit = [999,9999]
  zip = (a, b) => a.map((k, i) => [k, b[i]]);
  abstract asJSONConfig(): EChartsOption;
  series:any;
  indices
  chartElement:ChartReportElement
  namingDictionary;
  shareElement:DataPair[];
  reportsService:ReportsService
  constructor(series:any, chartElement:ChartReportElement,namingDictionary, reportsService:ReportsService) {
    this.chartElement=chartElement;
    this.series=series;
    this.namingDictionary=namingDictionary;
    this.reportsService=reportsService

    if (series) this.indices = series["index"]
  }
  getAllShareLabels(shareElement){
    let l = []
    for (let series of shareElement){
      l= [...l, ...Object.keys(series)]
    }
    return [...new Set(l)];
  }
  get questions():string[]{
    return this.chartElement.dataQuery.get.flat()
  }
  graySubstrings = ["brak zmian"]
  darkGraySubstrings = ["nie wiem", "nie dotyczy"]
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
  fourColorPalette=[
    "#F46D43","#FEE08B","#D8EE8A", "#66BD63", "#078202", "#9F9F9F"
  ]
  fiveColorPalette=[
    "#F46D43","#FEE08B","#FDFEBD", "#D8EE8A", "#66BD63", "#078202", "#9F9F9F"
  ]
  numberToStringScale = {
    5 : 'bardzo dobrze', 4:'raczej dobrze', 3:'średnio', 2:'raczej źle', 1:'bardzo źle'
  }
  getNumberToStringScale(n){
    console.log(n)
    if ( Number(n) in this.numberToStringScale) return this.numberToStringScale[Number(n)]
    else return n
  }
  sanitizeLabels(list){
    if (list.length==1) return [list, ""];
    const prefix = commonSubstring(list);
    console.log(prefix)
    return [list.map(d=>d.replace(prefix, '')), prefix]
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
  static transformDataIntoPairs(series,remove9999=false):DataPair[]{
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices = series["index"]
    var values = Object.assign({}, series);
    delete values['index'];
    if (remove9999){
      let indicesOfDefaultValues = indices.map((d,i)=>[d,i]).filter(d=>this.valuesToOmit.includes(d[0])).map(d=>d[1])
      for (let key in values){

        let res:[] = values[key].filter((d,i)=>!indicesOfDefaultValues.includes(i))
        values[key]=res;
      }
    }

    return zip(Object.keys(values), Object.values(values))
  }
  getLabelFor(question:string,value):string{
    let r;
    if (value==9999) return "Pominięto"
    if (value == "*") return this.chartElement.config.allTogetherLabel
    if (question in this.namingDictionary && this.namingDictionary[question]) {
      r = this.namingDictionary[question][value];
    }
    if (!r) {
      return String(value);
    } else {
      return String(r)
    }
    // return this.reportsService.getLabelFor(this.namingDictionary, question,value)
  }
  abstract generate():AbstractChartGenerator;
}
