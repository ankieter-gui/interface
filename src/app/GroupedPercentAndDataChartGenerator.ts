import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';
import {ColorsGenerator} from './ColorsGenerator';

export class GroupedPercentAndDataChartGenerator extends AbstractChartGenerator {
  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService, dictionaryOverrides) {
    super(series, chartElement, namingDictionary, reportsService, dictionaryOverrides);
    Object.values(series).forEach((d: any[]) => d.reverse());
    Object.values(series).forEach((d: any[]) => {
      d.push(d[0]);
      d.shift();
    });

  }

  indices;
  seriesList;
  chartName;

  generate(): AbstractChartGenerator {

    this.shareElement = AbstractChartGenerator.transformDataIntoPairs(this.series, true).filter(d => d[0].includes('share') || d[0].includes('*'))[0][1];
    this.indices = this.indices.filter(d => d != 999 && d != 9999);
    for (let x of this.shareElement) {
      delete x[9999];
    }
    for (let x of this.shareElement) {
      delete x[999];
    }
    this.seriesList = this.generateSeriesList(this.shareElement);

    this.chartName = this.chartName ? this.chartName : this.chartElement.dataQuery.get[0][0];
    return this;
  }

  shortenLabel(label: string) {
    console.log(label);
    if (this.chartElement.config.shortLabels) {
      return label.replace('Wydział', 'W.');
    }
    return label;
  }

  asJSONConfig(): EChartsOption {
    console.log(this.getAllShareLabels(this.shareElement).map(d => this.getNumberToStringScale(this.getLabelFor(this.chartElement.dataQuery.get[0][0], d))).reverse());
    return {

      color: '#3b3b3b',
      pxHeight: this.indices.length * (120 / 3) + 80,
      legend: {
        // top: 1+chartName.length*0.1+"%",
        data: this.getAllShareLabels(this.shareElement).map(d => this.getLabelFor(this.chartElement.dataQuery.get[0][0], d)).reverse()
        //data:this.getAllShareLabels(shareElement).map(d=>this.numberToStringScale[Number(d)])
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {type: 'value', show: false, animation: true, max: 100, axisLabel: {formatter: (value, index) => `${value}%`}},
      yAxis: {
        type: 'category', show: true, data:
          this.indices.map(d =>
            this.shortenLabel(this.getLabelFor(this.chartElement.dataQuery.by[0], d)))
        // indices.map(d=>this.numberToStringScale[Number(d)])
      },
      series: this.zip(Object.keys(this.seriesList), Object.values(this.seriesList)).reverse().map((d, index) => ({
        data: d[1],
        d: d,
        index: Object.keys(this.seriesList).length - 1 - index,
        name: this.shortenLabel(this.getLabelFor(this.chartElement.dataQuery.get[0][0], d[0])),
        // name:this.numberToStringScale[d[0]],
        type: 'bar',
        color: undefined,
        stack: 'total',
        label: {
          show: true,
          formatter: (options) => options.value != 0 ? `${Math.round(options.value)}%` : ''
        },
        // emphasis: {
        //   focus: 'series'
        // },
        smooth: false,
        symbol: 'none',
      }))
    } as EChartsOption
  }
}
