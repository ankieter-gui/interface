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
  colors:[string];
  showDataLabels:boolean;
  orientation:"horizontal"|"vertical";
  extraEChartLiteralObject?:EChartsOption=null;
}
export class ChartReportElement{
  dataQuery:DataQuery;
  config:ChartConfig;
}
