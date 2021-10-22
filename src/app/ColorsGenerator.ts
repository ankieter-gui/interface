import {ChartConfig, ChartReportElement} from './dataModels/ReportElement';
import {SingleQuestionTypesDefinition} from './dataModels/SingleQuestionTypesDefinition';
import {MultipleBarsChartGenerator} from './MultipleBarsChartGenerator';
import {BarSeriesOption, EChartsOption} from 'echarts';
import {AbstractChartGenerator} from './AbstractChartGenerator';
import Single from 'echarts/types/src/coord/single/Single';
import {GroupedPercentAndDataChartGenerator} from './GroupedPercentAndDataChartGenerator';
import {FrequencyChartGenerator} from './FrequencyChartGenerator';
import {MultipleChoiceChartGenerator} from './MultipleChoiceChartGenerator';

export class ColorsGenerator {
  chart: ChartReportElement;
  typeOf;
  lightBlue = '#1e6adb';
  darkBlue = '#0c4190';
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

    console.log(GroupedPercentAndDataChartGenerator);
    console.log(GroupedPercentAndDataChartGenerator == this.typeOf);
    console.log(this.typeOf.name);
    const x = {};
    x[FrequencyChartGenerator.name] = (o) => this.frequencyChartGenerator(o);
    x[MultipleChoiceChartGenerator.name] = (o) => this.multipleChoiceChartGenerator(o);
    x[MultipleBarsChartGenerator.name] = (o) => this.multipleBarsChartGenerator(o);
    x[GroupedPercentAndDataChartGenerator.name] = (o) => this.groupedPercentAndDataChartGenerator(o);
    const colorFunction = x[this.typeOf.name];
    if (colorFunction) {
      return colorFunction(options);
    }
    return options;
  }

  frequencyChartGenerator(options: EChartsOption): EChartsOption {
    let i = options.series[0].data.length - 1;
    (options.series[0] as any).data[i] = {value: (options.series[0] as any).data[i], itemStyle: {color: this.darkBlue},};
    console.log((options.series[0] as any).data[i]);
    return options;
  }

  multipleChoiceChartGenerator(options: EChartsOption): EChartsOption {
    (options.series as BarSeriesOption[]).forEach((d) => d.color = this.multipleChoiceRed);
    return options;
  }

  multipleBarsChartGenerator(options: EChartsOption): EChartsOption {
    let questionObject: SingleQuestionTypesDefinition = this.caller.namingDictionary[this.chart.dataQuery.get.flat()[0]];
    let pairs: [string, string][] = this.caller.zip(Object.keys(questionObject), Object.values(questionObject));
    for (let series of (options.series as any[])) {
      let data = series.d;
      series.color = this.sevenColorPalette[series.index];
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
