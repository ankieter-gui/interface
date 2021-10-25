import {EChartsOption} from 'echarts';
import {SurveyQuery} from './Query';
import {GlobalFilter} from './ReportDefinition';
import {AbstractChartGenerator} from '../AbstractChartGenerator';
import {OrderSetting} from './OrderSetting';

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
  order: OrderSetting = new OrderSetting();
  useManualOrdering?: boolean = false;
  ignoreAnswersForCalculations: any[];
  localLabelOverrides;
  showTitle = false;
  handCodedData: { value: string, label: string }[] = [{label: '', value: ''}];
  static colorSets = {
    default: ['red', 'blue', 'green']
  };
  type: 'summary' | 'groupedPercentAndData' | 'multipleChoice' | 'multipleChoiceAndData' | 'multipleBars' | 'groupedBars' | 'complex' | 'linearCustomData';
  colors? = {};
  showDataLabels?: boolean = true;
  allTogetherLabel = 'UAM';
  orientation?: 'horizontal' | 'vertical' = 'horizontal';
  extraEChartLiteralObject?: EChartsOption = null;
  tableDefinition: Table = {series: []};

  filter: GlobalFilter; //for legacy compatibility
  filters: GlobalFilter[] = [];
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
