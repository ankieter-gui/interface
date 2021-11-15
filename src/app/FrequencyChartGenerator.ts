import {AbstractChartGenerator} from './AbstractChartGenerator';
import {EChartsOption} from 'echarts';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {CallbackDataParams} from 'echarts/types/src/util/types';
import {breakLongLabels} from './breakLongLabels';

//groupedBars string type
export class FrequencyChartGenerator extends AbstractChartGenerator {
  chartValuesPairs;
  wereAllValuesFilledByHand: boolean = false;
getAllCount(reportId) {
}



  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService, dictionaryOverride) {
    super(series, chartElement, namingDictionary, reportsService, dictionaryOverride);
  }

  wasAnyValueFilled(): boolean {
    if (!this.chartElement.config.handCodedData) {
      return false;
    }
    for (let i of this.chartElement.config.handCodedData) {
      if (i.value) {
        return true;
      }
    }
    return false;
  }

  getWereAllValuesFilled(): boolean {
    let wereAllValuesFilled;
    if (!this.chartElement.config.handCodedData) {
      return false;
    }
    for (let i of this.chartElement.config.handCodedData) {
      console.log(i);
      if (!i.value) {
        wereAllValuesFilled = false;
        break;
      }
      wereAllValuesFilled = true;
    }
    return wereAllValuesFilled;
  }

  wasValueFilled(label: string) {
    if (!this.chartElement.config.handCodedData) {
      return false;
    }
    for (let i of this.chartElement.config.handCodedData) {
      if (i.label == label && i.value) {
        return true;
      }
    }
    return false;
  }
  maxXValue;
  generate(): FrequencyChartGenerator {
    console.log(this.series);
    this.shareElement = AbstractChartGenerator.transformDataIntoPairs(this.series).filter(d => d[0].includes('share'))[0][1][0];
    let categories = Object.keys(this.shareElement);
    let values = Object.values(this.shareElement);
    //make it into pairs [key,value][] so we can sort it later
    let chartValuesPairs = this.zip(categories, values);
    chartValuesPairs = chartValuesPairs.filter(d => d[0] != '9999' && d[0] != '999');
    this.wereAllValuesFilledByHand = this.getWereAllValuesFilled();
    let outChartValuesPairs = JSON.parse(JSON.stringify(chartValuesPairs)); //deep copy
    if (this.wasAnyValueFilled()) {
      outChartValuesPairs = [];
      //therefore we count percentages
      //we need to delete 999 and 9999 as there is no way to represent it meaningfuly when displaying %

      for (let pair of chartValuesPairs) {
        if (!this.wasValueFilled(pair[0])) {
          continue;
        }
        let category = pair[0];
        let handcodedValue = Number(this.chartElement.config.handCodedData.filter(d => d.label === category)[0].value);
        pair.push(Math.round(pair[1] / handcodedValue * 100));
        outChartValuesPairs.push(pair);
      }

      outChartValuesPairs = outChartValuesPairs.sort((a, b) => a[2] - b[2]);
      console.log(chartValuesPairs);
      let sum = 0;
      chartValuesPairs.forEach(d => sum += Number(d[1]));
      outChartValuesPairs = [...outChartValuesPairs, [this.chartElement.config.allTogetherLabel,
        sum,
        Math.round(sum / Number(this.chartElement.config.allTogetherValue) * 100)],];
      console.log(chartValuesPairs)
    } else {
      //we can't calculate percent. Stick with N only
      console.log(chartValuesPairs);
      this.chartElement.config.allTogetherValue = 0;
      for (let i of chartValuesPairs) {
        this.chartElement.config.allTogetherValue += i[1];
      }
      console.log(this.chartElement.config.allTogetherValue);
      chartValuesPairs = chartValuesPairs.sort((a, b) => a[1] - b[1]);
      outChartValuesPairs = [...chartValuesPairs, [this.chartElement.config.allTogetherLabel,
        this.chartElement.config.allTogetherValue]];
    }


    this.chartValuesPairs = outChartValuesPairs;
    this.maxXValue = Math.max(...this.getData())
    return this;
  }
  private getData(){
    if (this.wasAnyValueFilled()) {
      return this.chartValuesPairs.map(d => d[2]);
    } else {
      return this.chartValuesPairs.map(d => d[1]);
    }
  }
  private getLabels(){
    return this.chartValuesPairs.map(d=>d[0]).map(d=>this.getLabelFor(this.questions[0], d))
  }
  private getN(name){

    return this.chartValuesPairs.filter(d=>this.getLabelFor(this.questions[0],d[0])==name)[0][1]
  }
  private getFormatter(){
    if (this.wasAnyValueFilled()) {
      return (options: CallbackDataParams) => `${options.value}% (N=${this.getN(options.name)})`;
    } else {
      return (options: CallbackDataParams) => `${options.value}`;
    }
  }
  getXAxisLabel(){
    if (this.wasAnyValueFilled()){
      return (options)=>`${options}%`
    }
    else {
      return (options)=>`${options}`
    }
  }
  asJSONConfig(): EChartsOption {
    return {

      color: '#3b3b3b',
      pxHeight: this.getLabels().length * this.horizontalBarHeight,

      grid: {
        left: '10px',
        right: '4%',
        bottom: '3%',
        top: '0%',
        containLabel: true
      },
      xAxis: {type: 'value', axisLabel:{formatter:this.getXAxisLabel()} ,show: true, animation: true, axisLine: {show: true}, max:this.wasAnyValueFilled()?this.maxXValue+15>100?100:this.maxXValue+15:Math.round(this.maxXValue*1.1)},
      //@ts-ignore
      yAxis: {
        type: 'category',
        show: true,
        data: this.getLabels(),
        axisLabel: {formatter: (o) => breakLongLabels(o.toString(),1)},
        axisLine: {show: true}
      },
      series: [{
        //barMinHeight:this.horizontalBarHeight,
        data: this.getData(),
        name: 'Liczba odpowiedzi',
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        color: this.lightBlue,
        stack: 'total',
        label: {
          show: true,
          overflow:"truncate",
          position: 'right',
          formatter: this.getFormatter()
        },
        emphasis: {
          focus: 'series'
        },


      }]
    };
  }
}
