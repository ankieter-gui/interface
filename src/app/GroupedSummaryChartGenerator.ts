import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';
import {breakLongLabels} from './breakLongLabels';
import {commonSubstring} from './lcs';
import {OrderGenerators} from '../OrderGenerators';
import {SurveyQuery} from './dataModels/Query';

export class GroupedSummaryChartGenerator extends AbstractChartGenerator {
  yLabels;
  shortYLabels;
  sortedByMean;
  horizontalBarHeight = 26;
  ranks = [];
  seriesByScales = [];
  scales = [2.99,  3.5, 4, 4.5];

  getAllCount(reportId, complimentedQuery: SurveyQuery = undefined) {
  }

  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService, dictionaryOverrides) {
    super(series, chartElement, namingDictionary, reportsService, dictionaryOverrides);
    // Object.values(series).forEach((d: any[]) => d.reverse());
    // Object.values(series).forEach((d: any[]) => {
    //   d.push(d[0]);
    //   d.shift();
    // });

  }

  generate(): AbstractChartGenerator {
    const meanSeries = Object.entries(this.series).filter(d => d[0].includes('mean'));
    this.sortedByMean = meanSeries.sort((first, second) => first[1][0] - second[1][0]);
    this.yLabels = this.sortedByMean.map(d => d[0].replace('mean', ''));
    //TODO: to powinno być mniej naiwne ;(
    const lcs = commonSubstring(this.yLabels.map(s => s));
    this.shortYLabels = [];
    this.yLabels.forEach(d => {
      let u = d.split(' - ');
      this.shortYLabels.push(u[u.length - 1].replace(/\(.*?\)/, ''));
    });

    this.seriesByScales = new Array(this.scales.length + 2).fill(null).map(function() {
      return new Array(0);
    });
    //Array(this.scales.length+2).fill(JSON.parse(JSON.stringify([])))
    let ranks = [];
    console.log(this.sortedByMean);
    for (let entry of this.sortedByMean) {
      const value = entry[1][0];
      let rank = 0;
      for (let scale of this.scales) {
        if (value >= scale) {
          rank += 1;
        } else {
          break;
        }
      }
      ranks.push(rank);
    }
    for (let [j, series] of this.sortedByMean.entries()) {
      const rank = ranks[j];
      const value = series[1][0];

      this.seriesByScales[rank].push(value);
      console.log(this.seriesByScales[rank]);
      let max = Math.max(...this.seriesByScales.map(d => d.length));
      for (let scaleSeries of this.seriesByScales) {
        if (scaleSeries.length < max) {
          scaleSeries.push(0);
        }
      }
    }
    this.ranks = ranks;
    let _tableData = [];
    this.yLabels.forEach(label => {
      let tmp = this.chartElement.dataQuery.as.filter(d => d != 'mean').map(d => d + label);
      tmp = tmp.sort((a,b)=>a.includes("rows") || a.includes("count")?-1:1 )
      console.log(tmp)
      _tableData.push(tmp.map(u => this.series[u][0]));
    });

    this.tableData = {headers: this.chartElement.dataQuery.as.filter(d => d != 'mean').sort((a,b)=>a.includes("rows") || a.includes("count")?-1:1 ), data: _tableData.reverse()};
    //zmiana kolejności, tak, żeby N i N* były na pcczątku
    return this;
  }
  asJSONConfig(): EChartsOption {
    let namesToScales = ['2.99 i mniej', '3.00-3.49', '3.50-3.99', '4.00-4.49', '4.50 i więcej'];
    return {

      color: '#3b3b3b',
      pxHeight: this.yLabels.length * 23 + 58,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '25',
        containLabel: true
      },
      legend: {},
      xAxis: {type: 'value', show: true, animation: true, axisLine: {show: true}},
      //@ts-ignore
      yAxis: [{
        type: 'category',
        show: true,
        minorTick: {show: true},
        data: this.shortYLabels,
        axisLabel: {formatter: (o) => breakLongLabels(o.toString(), 3), fontSize: 10, interval: 0},
        axisLine: {show: true},
      }
      ]
      ,
      series: [...this.seriesByScales.entries()].map(d => ({
        data: d[1],
        name: namesToScales[d[0]],
        type: 'bar',
        rank: d[0],

        color: undefined,
        stack: 'total',
        label: {
          show: true,
          position: 'right',
          formatter: (o) => o.value != 0 ? `${Math.round(Number(o.value) * 100) / 100}` : ""
        },


      }))
    };
  }
}
