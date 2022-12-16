import {EChartsOption} from 'echarts';
import {SurveyQuery} from './Query';
import {GlobalFilter} from './ReportDefinition';
import {AbstractChartGenerator} from '../AbstractChartGenerator';
import {OrderSetting} from './OrderSetting';

export class ReportElement{
  type:"text"|"chart";
  alwaysBreakAfter=false;
  content:TextReportElement|ChartReportElement;
}
export class TextReportElement{
  isLinkedToSectionBelow=false;
  dontBreakInside=true;

  text:string;

}

export class Table {
  series: string[];
}
export interface HandCodedDataType{
// { value: string, secondLine?:string, label: string }[] | {value:string}[][]
}
export class ChartConfig {
  order: OrderSetting = new OrderSetting();
  useManualOrdering?: boolean = false;
  ignoreAnswersForCalculations: any[];
  localLabelOverrides;
  showTitle = false;
  handCodedData: any= undefined;
  static colorSets = {
    default: ['red', 'blue', 'green']
  };
  type:'multipleBarsOwnData' | 'groupSummary'| 'summary' | 'groupedPercentAndData' | 'multipleChoice' | 'multipleChoiceAndData' | 'multipleBars' | 'groupedBars' | 'complex' | 'linearCustomData';
  colors? = {};
  showDataLabels?: boolean = true;
  allTogetherLabel = 'UAM';
  dontDisplayAllTogetherLabel = false; //warunek jest odwrotny żeby nie psuć istniejących raportów
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
  lastCachesResponse:any;
  lastQueryCache:SurveyQuery;
}
