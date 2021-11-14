import {ChartConfig, ChartReportElement} from './dataModels/ReportElement';
import {SingleQuestionTypesDefinition} from './dataModels/SingleQuestionTypesDefinition';
import {MultipleBarsChartGenerator} from './MultipleBarsChartGenerator';
import {BarSeriesOption, EChartsOption} from 'echarts';
import {AbstractChartGenerator} from './AbstractChartGenerator';
import Single from 'echarts/types/src/coord/single/Single';
import {GroupedPercentAndDataChartGenerator} from './GroupedPercentAndDataChartGenerator';
import {FrequencyChartGenerator} from './FrequencyChartGenerator';
import {MultipleChoiceChartGenerator} from './MultipleChoiceChartGenerator';
import {LinearCustomDataChartGenerator} from './LinearCustomDataChartGenerator';
import {SummaryChartGenerator} from './SummaryChartGenerator';
import {MultipleBarsWithOwnDataChartGenerator} from './MultipleBarsWithOwnDataChartGenerator';
import {GroupedSummaryChartGenerator} from './GroupedSummaryChartGenerator';

export class ColorsGenerator {
  chart: ChartReportElement;
  typeOf;
  lightBlue = '#1e6adb';
  darkBlue = '#0c4190';
  frekwencjaBlue = '#64b5cd';
  frekwencjaBlueAccent = '#4c72b0';
  caller: AbstractChartGenerator;
  multipleChoiceRed = '#C44E52';
  fiveColorPalette = [
    '#9F9F9F', '#F46D43', '#FEE08B', '#D8EE8A', '#66BD63', '#078202',
  ];
  fourColorPalette = [

    '#F46D43',
    '#FEE08B',
    '#66BD63',
    '#078202',
  ];
  sevenColorPalette = [
    '#E34933',
    '#FCA55D',
    '#FEE999',
    '#E3F399',
    '#9DD569',
    '#39A758',
    '#D3D3D3'
  ];

  constructor(chart: ChartReportElement, typeOf, caller: AbstractChartGenerator) {
    this.chart = chart;
    this.caller = caller;
    this.typeOf = typeOf;
  }

  generateColors(options: EChartsOption): EChartsOption {


    const x = {};
    x[FrequencyChartGenerator.name] = (o) => this.frequencyChartGenerator(o);
    x[MultipleChoiceChartGenerator.name] = (o) => this.multipleChoiceChartGenerator(o);
    x[MultipleBarsChartGenerator.name] = (o) => this.multipleBarsChartGenerator(o);
    x[MultipleBarsWithOwnDataChartGenerator.name] = (o) => this.multipleBarsWithCustomDataChartGenerator(o);
    x[GroupedPercentAndDataChartGenerator.name] = (o) => this.groupedPercentAndDataChartGenerator(o);
    x[SummaryChartGenerator.name] = (o) => this.summaryChartGenerator(o);
    x[GroupedSummaryChartGenerator.name] = (o) => this.summaryChartGenerator(o);
    const colorFunction = x[this.typeOf.name];
    if (colorFunction) {
      return colorFunction(options);
    }
    console.log(options);
    return options;
  }

  summaryChartGenerator(options: EChartsOption): EChartsOption {
    console.log(options);

    (options.series as any[]).forEach((d) => d.color = this.sevenColorPalette[d.rank]);

    return options;
  }

  frequencyChartGenerator(options: EChartsOption): EChartsOption {
    let i = options.series[0].data.length - 1;
    options.series[0].color=this.frekwencjaBlue;
    (options.series[0] as any).data[i] = {value: (options.series[0] as any).data[i], itemStyle: {color: this.frekwencjaBlueAccent},};
    console.log((options.series[0] as any).data[i]);
    return options;
  }

  multipleChoiceChartGenerator(options: EChartsOption): EChartsOption {
    (options.series as BarSeriesOption[]).forEach((d) => d.color = (this.chart.config.colors && "all" in this.chart.config.colors)?this.chart.config.colors["all"]:this.multipleChoiceRed);
    return options;
  }
  multipleBarsWithCustomDataChartGenerator(options:EChartsOption):EChartsOption{
    for (let i of options.series as BarSeriesOption[]){
      let entry =this.chart.config.handCodedData[0].find(x=>x.value==i.name)
      if (entry.color){
      i.color = entry.color}
    }
    return options
  }
  multipleBarsChartGenerator(options: EChartsOption): EChartsOption {
    let questionObject: SingleQuestionTypesDefinition = this.caller.namingDictionary[this.chart.dataQuery.get.flat()[0]];
    let pairs: [string, string][] = this.caller.zip(Object.keys(questionObject), Object.values(questionObject));
    for (let series of (options.series as any[])) {
      let data = series.d;
      series.color = this.sevenColorPalette[series.index];
      console.log(this.chart.config.colors);
      console.log(series.orderLabel);
      if (this.chart.config.colors && this.chart.config.colors[series.orderLabel]) {
        series.color = this.chart.config.colors[series.orderLabel];
      }
    }
    return options;
  }

  groupedPercentAndDataChartGenerator(options: EChartsOption): EChartsOption {
    const seriesLength = (options.series as any[]).length;
    for (let series of (options.series as any[])) {
      let data = series.d;
      if (seriesLength > 4) {
        series.color = this.fiveColorPalette[series.index];
      } else {
        series.color = this.fourColorPalette[series.index];
      }
      if (this.chart.config.colors && this.chart.config.colors[series.orderLabel]) {
        series.color = this.chart.config.colors[series.orderLabel];
      }
    }

    return options;
  }

}

export class ColorScheme {
}
