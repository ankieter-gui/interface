import {EChartsOption} from 'echarts';
import {ChartReportElement} from './dataModels/ReportElement';
import {Data} from '@angular/router';
import {ReportsService} from './reports.service';
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
  static valuesToOmit = [999,9999]
  zip = (a, b) => a.map((k, i) => [k, b[i]]);
  abstract asJSONConfig(): EChartsOption;
  series:any;
  chartElement:ChartReportElement
  namingDictionary;
  shareElement:DataPair[];
  reportsService:ReportsService
  constructor(series:any, chartElement:ChartReportElement,namingDictionary, reportsService:ReportsService) {
    this.chartElement=chartElement;
    this.series=series;
    this.namingDictionary=namingDictionary;
    this.reportsService=reportsService
  }
  getAllShareLabels(shareElement){
    let l = []
    for (let series of shareElement){
      l= [...l, ...Object.keys(series)]
    }
    return [...new Set(l)];
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
  getLabelFor(question:string,value:string):string{
    return this.reportsService.getLabelFor(this.namingDictionary, question,value)
  }
  abstract generate():AbstractChartGenerator;
}
