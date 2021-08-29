import {AbstractChartGenerator} from './AbstractChartGenerator';
import {EChartsOption} from 'echarts';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {CallbackDataParams} from 'echarts/types/src/util/types';

//groupedBars string type
export class FrequencyChartGenerator extends AbstractChartGenerator {
  chartValuesPairs;
  wereAllValuesFilledByHand: boolean = false;
  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService) {
    super(series, chartElement, namingDictionary, reportsService);
  }
  getWereAllValuesFilled():boolean{
    let wereAllValuesFilled;
    for (let i of this.chartElement.config.handCodedData){
      console.log(i)
      if (!i.value) {wereAllValuesFilled=false;break}
      wereAllValuesFilled=true;
    }
    return wereAllValuesFilled
  }
  generate(): FrequencyChartGenerator {
    console.log(this.series);
    this.shareElement = AbstractChartGenerator.transformDataIntoPairs(this.series).filter(d => d[0].includes('share'))[0][1][0];
    let categories = Object.keys(this.shareElement);
    let values = Object.values(this.shareElement);
    //make it into pairs [key,value][] so we can sort it later
    let chartValuesPairs = this.zip(categories, values);
    chartValuesPairs=chartValuesPairs.filter(d=>d[0]!="9999" && d[0]!="999")
    this.wereAllValuesFilledByHand = this.getWereAllValuesFilled();
    if (this.wereAllValuesFilledByHand){

        //therefore we count percentages
        //we need to delete 999 and 9999 as there is no way to represent it meaningfuly when displaying %

        for (let pair of chartValuesPairs){
          let category = pair[0]
          let handcodedValue = Number(this.chartElement.config.handCodedData.filter(d=>d.label===category)[0].value)
          pair.push(Math.round(pair[1]/ handcodedValue * 100))
        }
        chartValuesPairs = chartValuesPairs.sort((a,b)=>a[2]-b[2])
      chartValuesPairs = [[this.chartElement.config.allTogetherLabel, ], ...chartValuesPairs]
      }else {
        //we can't calculate percent. Stick with N only
        chartValuesPairs = chartValuesPairs.sort((a,b)=>a[1]-b[1])
      }


    this.chartValuesPairs=chartValuesPairs
    return this;
  }
  private getData(){
    if (this.wereAllValuesFilledByHand){
      return this.chartValuesPairs.map(d=>d[2])
    }else{
      return this.chartValuesPairs.map(d=>d[1])
    }
  }
  private getLabels(){
    return this.chartValuesPairs.map(d=>d[0]).map(d=>this.getLabelFor(this.questions[0], d))
  }
  private getN(name){
    console.log(name)
    console.log(this.chartValuesPairs)
    return this.chartValuesPairs.filter(d=>this.getLabelFor(this.questions[0],d[0])==name)[0][1]
  }
  private getFormatter(){
    if (this.wereAllValuesFilledByHand){
      return (options:CallbackDataParams)=>`${options.value}% (N=${this.getN(options.name)})`
    }else{
      return (options:CallbackDataParams)=>`${options.value}`
    }
  }
  asJSONConfig(): EChartsOption {
    return {

      color: '#3b3b3b',
       pxHeight: this.getLabels().length*this.horizontalBarHeight,

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '0%',
        containLabel: true
      },
      xAxis: {type: 'value', show: true, animation: true},
      //@ts-ignore
      yAxis: {type: 'category', show: true, data: this.getLabels(), axisLabel: {overflow: 'break'}},
      series: [{
        //barMinHeight:this.horizontalBarHeight,
        data:this.getData(),
        name: 'Liczba odpowiedzi',
        type: 'bar',
        color:this.lightBlue,
        stack: 'total',
        label: {
          show: true,

           formatter: this.getFormatter()
        },
        emphasis: {
          focus: 'series'
        },


      }]
    };
  }
}
