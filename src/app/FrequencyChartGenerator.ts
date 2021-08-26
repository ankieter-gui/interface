import {AbstractChartGenerator} from './AbstractChartGenerator';
import {EChartsOption} from 'echarts';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';

//groupedBars string type
export class FrequencyChartGenerator extends AbstractChartGenerator {
  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService) {
    super(series, chartElement, namingDictionary, reportsService);
  }

  generate(): FrequencyChartGenerator {
    console.log(this.series);
    this.shareElement = AbstractChartGenerator.transformDataIntoPairs(this.series).filter(d => d[0].includes('share'))[0][1][0];
    let categories = Object.keys(this.shareElement);
    let values = Object.values(this.shareElement);
    //make it into pairs [key,value][] so we can sort it later
    let chartValuesPairs = this.zip(categories, values);
    let wereAllValuesFilledByHand: boolean = false;
    let u = {
      true: () => {
        //therefore we count percentages
        //we need to delete 999 and 9999 as there is no way to represent it meaningfuly when displaying %
        chartValuesPairs=chartValuesPairs.filter(d=>d[0]!="9999" && d[0]!="999")
        for (let pair of chartValuesPairs){
          let category = pair[0]
          let handcodedValue = Number(this.chartElement.config.handCodedData.filter(d=>d.label===category)[0].value)
          pair.push(Math.round(pair[1]/ handcodedValue * 100))
        }
        chartValuesPairs = chartValuesPairs.sort((a,b)=>a[2]-b[2])
      },
      false: () => {
        //we can't calculate percent. Stick with N only
      }
      //@ts-ignore
    }[wereAllValuesFilledByHand]();
    return this;
  }

  asJSONConfig(): EChartsOption {
    return {

      color: '#3b3b3b',
      // pxHeight: categories.length*this.horizontalBarHeight,
      // legend:{
      //  data:this.getAllShareLabels(shareElement)
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '0%',
        containLabel: true
      },
      xAxis: {type: 'value', show: true, animation: true},
      //@ts-ignore
      yAxis: {type: 'category', show: true, data: categories, axisLabel: {overflow: 'break'}},
      series: [{
        //barMinHeight:this.horizontalBarHeight,
        // data:values,
        name: 'Liczba odpowiedzi',
        type: 'bar',
        // color:this.lightBlue,
        stack: 'total',
        label: {
          show: true,
          //TODO: co z tym?
          // formatter: wereAllValuesFilled?(options)=>`${options.name!="łącznie"?options.value:percentShares[options.name]}% (N=${options.value})`:"{c}"
        },
        emphasis: {
          focus: 'series'
        },


      }]
    };
  }
}
