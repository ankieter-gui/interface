import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';
import {breakLongLabels} from './breakLongLabels';
import {commonSubstring} from './lcs';

export class MultipleChoiceChartGenerator extends AbstractChartGenerator {
  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService, dictionaryOverrides) {
    super(series, chartElement, namingDictionary, reportsService, dictionaryOverrides);
  }

  chartName;


  getAllCount(reportId): any {
    this.reportsService.answersCountMacro(reportId, this.chartElement.dataQuery.get.flat(), this.chartElement.dataQuery.filter).then(x=>this.allAnswers = x)

  }

  generate(): MultipleChoiceChartGenerator {
    let shareElements = AbstractChartGenerator.transformDataIntoPairs(this.series).filter(d => d[0].includes('share'));
    let categories = shareElements.map(d => d[0].replace('share ', '').replace(/<[^>]*>/g, ''));
    let commonSubstringResults = this.sanitizeLabels(categories);
    this.chartElement.name = commonSubstring(categories).replace(" -", "");
    categories = commonSubstringResults[0];

    this.chartName = !!this.chartName ? this.chartName : commonSubstringResults[1];
    let barSeries = shareElements.map(d => {
      let sum=0;

      try {

        sum = Object.values(d[1][0]).reduce((previousValue: number, currentValue: number, index, array) => previousValue + currentValue) as number
      }
      catch (e){
        console.log("could not count responses amount")
        console.log(e)
      }

      //dont touch ;(((
      return sum!=0?(1 in d[1][0])?d[1][0]['1']/sum*100:0:0
    });
    console.log("categories")
    console.log(categories)
    console.log("barSeries")
    console.log(barSeries)
    let o = this.zip(categories,barSeries).sort((a,b)=>a[1]-b[1])
    this.categories=o.map(d=>d[0])
    this.barSeries=o.map(d=>d[1])

    return this;
  }
  categories;
  barSeries
  asJSONConfig(): EChartsOption {
    return {
      color: '#64B5CD',
      pxHeight: this.categories.length * this.horizontalBarHeight,

      grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        top: '0%',
        containLabel: true
      },
      xAxis: {type: 'value', show: true, animation: true},
      //@ts-ignore
      yAxis: {type: 'category', show: true, data: this.categories, axisLabel: {formatter: (o) => breakLongLabels(o.toString())},},
      series: [{
        barWidth: '20px',
        data: this.barSeries,
        name: 'Procent odpowiedzi',
        type: 'bar',
        color: undefined,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        stack: 'total',
        label: {
          show: true,
          formatter: (options) => `${Math.round(Number(options.value))}%`
        },
        emphasis: {
          focus: 'series'
        },


      }]
    }
  }
}
