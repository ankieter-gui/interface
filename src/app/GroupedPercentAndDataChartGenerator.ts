import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';
import {ColorsGenerator} from './ColorsGenerator';
import {OrderSetting} from './dataModels/OrderSetting';
import {OrderSettingGenerator} from './OrderSettingGenerator';
import {OrderGenerators} from '../OrderGenerators';
import {SurveyQuery} from './dataModels/Query';

export class GroupedPercentAndDataChartGenerator extends AbstractChartGenerator {
  entries;

  indices;
  seriesList;
  chartName;
  legend;
  transposedEntries;

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
    this.legend = this.chartElement.config.order.order.map(d => this.getLabelFor(this.chartElement.dataQuery.get[0][0], d));
    this.entries = Object.entries(this.series).filter(d => d[0] != 'index' && d[0].includes('share')).map(d => this.zip(d[1], this.chartElement.config.order.order))[0];

    this.entries.forEach(d => {

      let tmp = d[0];
      d[0] = d[1];
      d[1] = tmp;

      let sum = 0;

      // @ts-ignore
     d[1].forEach(u => sum += u);
      // @ts-ignore
      d[1].forEach((u, i) => d[1][i] = u / sum * 100);
    });
    let transpose = m => m[0].map((x, i) => m.map(x => x[i]));
    console.log(this.series);
    console.log(this.entries);
    this.transposedEntries = transpose(this.entries.map(d => d[1]));
    console.log(this.transposedEntries);
    this.chartName = this.chartName ? this.chartName : this.chartElement.dataQuery.get[0][0];
    this.yLabels = OrderGenerators.moveFirstToLast(this.indices.reverse()).order.map(d => this.shortenLabel(this.getLabelFor(this.chartElement.dataQuery.by[0], d)))
    let _tableData=[]
    let headers=[]
    let tableEntries = Object.entries(this.rawSeries).filter(d=>!(d[0].includes("share") || d[0]=="index"))
    const shortFullNamePair = tableEntries.map(x=>[x[0].split(" ")[0], x[0]])
    let sorted = OrderSetting.sortAnotherArrayInPlace(this.orderOfColumns,shortFullNamePair).filter(x=>x!=0)
    sorted.forEach(x=>{
      const shortName = x.split(" ")[0]
      const fullKeyName=x
      console.log(x)
      const seriesValue = this.rawSeries[fullKeyName]
      const correctOrder = OrderGenerators.moveFirstToLast(seriesValue.reverse()).order //since we append a new field "UAM".
      _tableData.push(correctOrder)
      headers.push(shortName)
    })


    console.log(_tableData)
    this.tableData={headers:headers, data:_tableData.length>0?_tableData:[]};
   
    this.tableData.data = this.tableData.data.length>0?transpose(this.tableData.data).reverse():[]
    return this;
  }
yLabels;
  shortenLabel(label: string) {
    if (this.chartElement.config.shortLabels) {
      return label.replace('Wydział', 'W.');
    }
    return label;
  }

  asJSONConfig(): EChartsOption {
    //Nie działa  - linked issue: https://github.com/ankieter-gui/engine/issues/74
    // let orderedEntriesList = this.zip(Object.keys(this.seriesList), Object.values(this.seriesList)).reverse();
    // let orderedLegend: any[] = this.getAllShareLabels(this.shareElement).map(d => this.getLabelFor(this.chartElement.dataQuery.get[0][0], d)).reverse();

    return {

      color: '#3b3b3b',
      pxHeight: this.indices.length * (120 / 3) + 80,
      legend: {
        // top: 1+chartName.length*0.1+"%",
        data: this.legend,
        textStyle:{fontSize:11},
        //data:this.getAllShareLabels(shareElement).map(d=>this.numberToStringScale[Number(d)])
      },
      grid: {
        top:60,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {type: 'value', show: false, animation: true, max: 100, axisLabel: {formatter: (value, index) => `${value}%`}},
      yAxis: {
        type: 'category', show: true, data:this.yLabels
      },
      series: this.zip(this.chartElement.config.order.order, this.transposedEntries).map((d, index) => ({
        data: OrderGenerators.moveFirstToLast(this.transposedEntries[index].reverse()).order,
        d: d[1],
        orderLabel: d[0],
        index: this.transposedEntries.length - 1 - index,
        name: this.shortenLabel(this.getLabelFor(this.chartElement.dataQuery.get[0][0], d[0])),
        // name:this.numberToStringScale[d[0]],
        type: 'bar',
        color: undefined,
        stack: 'total',
        label: {
          show: true,
          formatter: (options) => Math.round(options.value) != 0 ? `${Math.round(options.value)}%` : ''
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
