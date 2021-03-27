import {EChartsOption} from 'echarts';

export class ReportElement{
  type:string;
  content:TextReportElement|ChartReportElement;
}
export class TextReportElement{

  text:string;

}
export class DataQuery{}
export enum ChartTypes{
  bar="bar",
  pie="pie",
  line="line",
}
export class ChartConfig{
  type:ChartTypes;
  colors?:string[]=["black"];
  showDataLabels?:boolean=true;
  orientation?:"horizontal"|"vertical"="horizontal";
  extraEChartLiteralObject?:EChartsOption=null;
}
export class ChartReportElement{
  name:string;
  dataQuery:DataQuery;
  config:ChartConfig;
  text:string;
}
