import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';

export class MultipleChoiceChartGenerator extends AbstractChartGenerator{
  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService) {
    super(series, chartElement, namingDictionary, reportsService);
  }
  chartName;
  generate(): MultipleChoiceChartGenerator {
    let shareElements=AbstractChartGenerator.transformDataIntoPairs(this.series).filter(d=>d[0].includes("share"))
    console.log(shareElements)
    let categories =shareElements.map(d=>d[0].replace("share ", "").replace(/<[^>]*>/g, ''))
    let commonSubstringResults =  this.sanitizeLabels(categories)
    categories=commonSubstringResults[0]
    this.chartName = !!this.chartName?this.chartName:commonSubstringResults[1]
    let barSeries = shareElements.map(d=>{
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
    })
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
      color:"#64B5CD",
      pxHeight: this.categories.length*this.horizontalBarHeight,

      grid:{left: '3%',
        right: '4%',
        bottom: '3%',
        top:"0%",
        containLabel: true},
      xAxis:{type:'value', show:true, animation:true},
      //@ts-ignore
      yAxis:{type:'category', show:true, data:categories, axisLabel:{overflow:"break"}},
      series:[{

        data:this.barSeries,
        name:"Procent odpowiedzi",
        type:'bar',
        color:this.lightBlue,
        stack: 'total',
        label: {
          show: true,
          formatter: (options)=>`${Math.round(Number(options.value))}%`
        },
        emphasis: {
          focus: 'series'
        },


      }]
    }
  }
}
