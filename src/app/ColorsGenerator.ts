import {ChartConfig, ChartReportElement} from './dataModels/ReportElement';
import {SingleQuestionTypesDefinition} from './dataModels/SingleQuestionTypesDefinition';
import {MultipleBarsChartGenerator} from './MultipleBarsChartGenerator';
import {BarSeriesOption, EChartsOption} from 'echarts';
import {AbstractChartGenerator} from './AbstractChartGenerator';
import Single from 'echarts/types/src/coord/single/Single';
import {GroupedPercentAndDataChartGenerator} from './GroupedPercentAndDataChartGenerator';

export class ColorsGenerator {
  chart: ChartReportElement;
  typeOf;
  lightBlue = '#1e6adb';
  caller: AbstractChartGenerator;
  fourColorPalette = [
    '#F46D43', '#FEE08B', '#D8EE8A', '#66BD63', '#078202', '#9F9F9F'
  ];

  constructor(chart: ChartReportElement, typeOf, caller: AbstractChartGenerator) {
    this.chart = chart;
    this.caller = caller;
    this.typeOf = typeOf;
  }

  generateColors(options: EChartsOption): EChartsOption {
    console.log(this.typeOf);
    console.log(GroupedPercentAndDataChartGenerator);
    console.log(GroupedPercentAndDataChartGenerator == this.typeOf);
    let x = {
      'MultipleChoiceChartGenerator': (o) => this.multipleChoiceChartGenerator(o),
      'MultipleBarsChartGenerator': (o) => this.multipleBarsChartGenerator(o),
      'GroupedPercentAndDataChartGenerator': (o) => this.groupedPercentAndDataChartGenerator(o)

    }[this.typeOf.name];
    console.log(x);
    if (x) {
      return x(options);
    }
    return options;
  }

  multipleChoiceChartGenerator(options: EChartsOption): EChartsOption {
    (options.series as BarSeriesOption[]).forEach((d) => d.color = this.lightBlue);
    return options;
  }

  multipleBarsChartGenerator(options: EChartsOption): EChartsOption {
    let questionObject: SingleQuestionTypesDefinition = this.caller.namingDictionary[this.chart.dataQuery.get.flat()[0]];
    let pairs: [string, string][] = this.caller.zip(Object.keys(questionObject.values), Object.values(questionObject.values));
    for (let series of (options.series as any[])) {
      let data = series.d;
      console.log(data);
    }
    return options;
  }

  groupedPercentAndDataChartGenerator(options: EChartsOption): EChartsOption {

    console.log(this.chart.dataQuery.get.flat()[0]);
    console.log(this.caller.namingDictionary);
    let questionObject: SingleQuestionTypesDefinition = this.caller.namingDictionary[this.chart.dataQuery.get.flat()[0]];
    console.log(questionObject);
    let pairs: [string, string][] = this.caller.zip(Object.keys(questionObject), Object.values(questionObject));
    for (let series of (options.series as any[])) {
      let data = series.d;
      series.color = this.fourColorPalette[series.index];
    }
    return options;
  }

}

export class ColorScheme {
}
