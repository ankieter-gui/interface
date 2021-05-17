import {EChartsOption} from 'echarts';
import {SurveyQuery} from './Query';

export class ReportElement{
  type:"text"|"chart";
  content:TextReportElement|ChartReportElement;
}
export class TextReportElement{

  text:string;

}

export enum ChartTypes{
  bar="bar",
  pie="pie",
  line="line",
}
export class ChartConfig{
  static colorSets={
    default:["red", "blue", "green"]
  }
  type:ChartTypes;
  colors?:string[]=ChartConfig.colorSets.default;
  showDataLabels?:boolean=true;
  orientation?:"horizontal"|"vertical"="horizontal";
  extraEChartLiteralObject?:EChartsOption=null;
}
export class ChartReportElement{
  name:string;
  dataQuery:SurveyQuery;
  config:ChartConfig;
  text:string;
}
