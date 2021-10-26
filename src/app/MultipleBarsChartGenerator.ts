import {AbstractChartGenerator} from './AbstractChartGenerator';
import {ChartReportElement} from './dataModels/ReportElement';
import {ReportsService} from './reports.service';
import {EChartsOption} from 'echarts';

export class MultipleBarsChartGenerator extends AbstractChartGenerator {
  xAxisLabels;
  barSeries;


  getAllCount(reportId) {
  }

  constructor(series: any, chartElement: ChartReportElement, namingDictionary, public reportsService: ReportsService, dictionaryOverrides) {
    super(series, chartElement, namingDictionary, reportsService, dictionaryOverrides);
  }


  generate(): MultipleBarsChartGenerator {
    this.xAxisLabels = this.series.index;
    this.shareElement = AbstractChartGenerator.transformDataIntoPairs(this.series).filter(d => d[0].includes('share'))[0][1];
    let seriesList = this.generateSeriesList(this.shareElement);
    console.log(this.shareElement);
    console.log('shareElement');
    this.barSeries = seriesList;
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
        data: this.chartElement.config.order.order.map(d => this.getLabelFor(this.chartElement.dataQuery.get[0][0], d))
      },

      pxHeight: 500,
      xAxis: [
        {
          boundaryGap: true,
          type: 'category',
          axisTick: {show: false},
          axisLabel: {
            interval: 0,
            rotate: this.shareElement.length > 4 ? 30 : 0 //If the label names are too long you can manage this by rotating the label.
          },
          //rok, stopień lub kierunek
          data: this.xAxisLabels.map(d => this.getLabelFor(this.chartElement.dataQuery.by[0], d))
        }
      ],
      yAxis: [
        {

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
        this.zip(this.chartElement.config.order.order, this.barSeries).map((d, index) => ({
          name: this.getLabelFor(this.chartElement.dataQuery.get[0][0], d[0]),
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
          orderLabel: d[0],
          data: d[1]
        }))
    };
  }
}
