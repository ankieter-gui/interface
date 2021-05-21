import {EChartsOption} from 'echarts';
import {SurveyQuery} from './Query';

export class ReportElement{
  type:"text"|"chart";
  content:TextReportElement|ChartReportElement;
}
export class TextReportElement{

  text:string;

}

export class Table{
  series:string[]
}
export class ChartConfig{

  static colorSets={
    default:["red", "blue", "green"]
  }
  type: 'groupedPercentAndData'| 'multipleChoice'| 'multipleChoiceAndData'| 'multipleBars'| 'groupedBars'| 'complex'
  colors?:string[]=ChartConfig.colorSets.default;
  showDataLabels?:boolean=true;
  orientation?:"horizontal"|"vertical"="horizontal";
  extraEChartLiteralObject?:EChartsOption=null;
  tableDefinition:Table={series:[]};
}
export class ChartReportElement{
  name:string;
  dataQuery:SurveyQuery;
  config:ChartConfig;
  text:string;
}