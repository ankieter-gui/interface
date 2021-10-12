import {EChartsOption} from 'echarts';
import {SurveyQuery} from './Query';
import {GlobalFilter} from './ReportDefinition';
import {AbstractChartGenerator} from '../AbstractChartGenerator';

export class ReportElement{
  type:"text"|"chart";
  content:TextReportElement|ChartReportElement;
}
export class TextReportElement{

  text:string;

}

export class Table {
  series: string[];
}

export class ChartConfig {
  ignoreAnswersForCalculations: any[];
  localLabelOverrides;
  showTitle = false;
  handCodedData: { value: string, label: string }[] = [{label: '', value: ''}];
  static colorSets = {
    default: ['red', 'blue', 'green']
  };
  type: 'groupedPercentAndData' | 'multipleChoice' | 'multipleChoiceAndData' | 'multipleBars' | 'groupedBars' | 'complex' | 'linearCustomData';
  colors?: string[] = ChartConfig.colorSets.default;
  showDataLabels?: boolean = true;
  allTogetherLabel = 'UAM';
  orientation?: 'horizontal' | 'vertical' = 'horizontal';
  extraEChartLiteralObject?: EChartsOption = null;
  tableDefinition: Table = {series: []};
  filter: GlobalFilter;
  allTogetherValue = 0;
  shortLabels = false;
}

export class ChartReportElement {
  name: string;
  dataQuery: SurveyQuery;
  config: ChartConfig;
  text: string;
  generator: AbstractChartGenerator;
}
