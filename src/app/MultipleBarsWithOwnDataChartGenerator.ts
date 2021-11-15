import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import * as _ from 'lodash';
import {EChartsOption} from 'echarts';

export class MultipleBarsWithOwnDataChartGenerator extends AbstractChartGenerator{
  xAxisLabels;
  barSeries=[];
  legend;

  getAllCount(reportId) {
  }

  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService, dictionaryOverrides) {
    super(series, chartElement, namingDictionary, reportsService, dictionaryOverrides);
  }

  xAxisLabelsToDisplay
  generate(): MultipleBarsWithOwnDataChartGenerator {
    this.xAxisLabels = this.chartElement.config.handCodedData.slice(1).map(d=>d[0].value)
    this.legend = this.chartElement.config.handCodedData[0].slice(1).map(v=>v.value)
    for (let [i,row] of this.chartElement.config.handCodedData.slice(1).entries()){
      console.log(row)
      for (let [j,column] of row.slice(1).entries()){
        if (!this.barSeries[j]) this.barSeries[j]=[]
        this.barSeries[j][i]=column.value
      }
    }
    console.log(this.barSeries)
    return this;

  }

  asJSONConfig(): EChartsOption {
    const posList = [
      'left', 'right', 'top', 'bottom',
      'inside',
      'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
      'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
    ];

    const configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function(map, pos) {
          map[pos] = pos;
          return map;
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    };

    const config = {
      rotate: 45,
      align: 'left',
      verticalAlign: 'middle',
      position: 'top',
      distance: 5,
    };


    return {
      legend: {
        data: this.legend
      },

      pxHeight: 500,
      xAxis: [
        {
          boundaryGap: true,
          type: 'category',
          axisTick: {show: false},
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          //rok, stopień lub kierunek
          data: this.xAxisLabels
        }
      ],
      yAxis: [
        {
          max:Math.max(...this.barSeries.flat())+25,
          type: 'value'
        }
      ],
      grid: {
        left: '0%',
        right: '0%',
        bottom: '3%',
        containLabel: true
      },

      series:
      //każda seria to jeden słupek w tej samej pozycji ale w różnych grupach
        this.zip(this.legend, this.barSeries).map((d, index) => ({
          name: d[0],
          d: d,
          index: index,
          type: 'bar',
          barWidth: 20,
          color: undefined,
          barGap: 0,
          label: {
            show: true,
            position: config.position,
            distance: config.distance,
            align: config.align,
            verticalAlign: config.verticalAlign,
            rotate: config.rotate,
            formatter: (options) => Math.round(options.value) != 0 ? `${Math.round(options.value)}%` : '',
            fontSize: 12,
            rich: {
              name: {}
            }
          },

          data: d[1]
        }))
    };
  }
}
