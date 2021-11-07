import {FrequencyChartGenerator} from './FrequencyChartGenerator';
import {MultipleBarsChartGenerator} from './MultipleBarsChartGenerator';
import {GroupedPercentAndDataChartGenerator} from './GroupedPercentAndDataChartGenerator';
import {MultipleChoiceChartGenerator} from './MultipleChoiceChartGenerator';
import {LinearCustomDataChartGenerator} from './LinearCustomDataChartGenerator';
import {SummaryChartGenerator} from './SummaryChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';

export class SuggestionsGenerator{
  empty = ()=>[]
  getQuestionsGenerator(chartElement:ChartReportElement){
    let strategyType = {
      'groupedBars':this.frequencyChartSuggestionsGenerator,
      'multipleBars': this.multipleBarsSuggestionsGenerator,
      'groupedPercentAndData': this.groupedPercentAndDataSuggestionsGenerator,
      'summary': this.groupedPercentAndDataSuggestionsGenerator,
    }[chartElement.config.type];
    return strategyType?strategyType:this.empty
  }
  getGroupByGenerator(chartElement:ChartReportElement){
    let strategyType = {
      'multipleBars': this.multipleBarsSuggestionsGeneratorGroupBy,
      'groupedPercentAndData': this.groupedPercentAndDataSuggestionsGeneratorGroupBy,
    }[chartElement.config.type];
    return strategyType?strategyType:this.empty
  }
  frequencyChartSuggestionsGenerator(allQuestions:string[]){
    return allQuestions.filter(d=>d.includes("wydzia"))
  }
  groupedPercentAndDataSuggestionsGenerator(allQuestions:string[]){
    return allQuestions.filter(d=>d.includes("1"))
  }
  groupedPercentAndDataSuggestionsGeneratorGroupBy(allQuestions:string[]){
    return allQuestions.filter(d=>d.includes("stop") || d.includes("rok"))
  }
  multipleBarsSuggestionsGenerator(allQuestiosn:string[]){
    return allQuestiosn.filter(d=>d.includes("ocen"))
  }
  multipleBarsSuggestionsGeneratorGroupBy(allQuestiosn:string[]){
    return allQuestiosn.filter(d=>d.includes("stop"))
  }
}
