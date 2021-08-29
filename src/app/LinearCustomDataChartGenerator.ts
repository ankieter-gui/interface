import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';

export class LinearCustomDataChartGenerator extends AbstractChartGenerator {
  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService) {
    super(series, chartElement, namingDictionary, reportsService);
  }

  generate(): LinearCustomDataChartGenerator {
    return this;
  }

  asJSONConfig(): EChartsOption {
    return {
      pxHeight: 250,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        minorTick: {show: true},
        data: this.chartElement.config.handCodedData.map(d => d.label)
      },
      yAxis: {
        min: Number(Math.min(
          ...this.chartElement.config.handCodedData.map(
            d => Number(d.value)))) - 0.05 * Number(Math.min(
          ...this.chartElement.config.handCodedData.map(d => Number(d.value))
          )
        ),
        type: 'value'
      },
      series: [{
        data: this.chartElement.config.handCodedData.map(d => Number(d.value)),
        type: 'line'
      }]
    };
  }

}
