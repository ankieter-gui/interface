import { Injectable } from '@angular/core';
import {ChartReportElement} from './dataModels/ReportElement';
import {EChartsOption} from 'echarts';
import * as lcs from 'node-lcs'
import * as Chance from 'chance'
import {commonSubstring} from './lcs';
import {SeriesLabelOption} from 'echarts/types/src/util/types';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  presetsToTypes={
    'groupedPercentAndData':'bar', 'multipleChoice':'bar', 'multipleChoiceAndData':'bar', 'multipleBars':'bar', 'groupedBars':'bar', 'complex':'bar'
  }
  defaultColorPalette = ["#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600"]

  fiveColorPalette=[
    "#c01f50","#cc5a29","#bb900c", "#92bf42", "#37e79a", "#9F9F9F"
  ]
  sevenColorPalette=[
    "#c01f50","#cc5a29","#bb900c","#CAF259", "#92bf42", "#37e79a","#59B0F2", "#9F9F9F"
  ]
  lengthsToPalettes = {
    1:this.fiveColorPalette,
    5:this.fiveColorPalette,
    7:this.sevenColorPalette
  }
  getAllShareLabels(shareElement){
    let l = []
    for (let series of shareElement){
      l= [...l, ...Object.keys(series)]
    }
    return [...new Set(l)];
  }
  constructor() { }

   zip = (a, b) => a.map((k, i) => [k, b[i]]);
  transformDataIntoPairs(series){
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices = series["index"]
    var values = Object.assign({}, series);
    delete values['index'];
    return zip(Object.keys(values), Object.values(values))
  }
  generateSeriesList(shareElement:object[]){
    let resultingMap={}
    let allKeys = this.getAllShareLabels(shareElement)
    for (let valuesMap of shareElement){
      const sum = Object.values(valuesMap).reduce((previousValue:number, currentValue:number, index, array)=>previousValue + currentValue)
      for (let key of allKeys){
        let val =0;
        // console.log("key: "+key)
        if (key in valuesMap) val =Math.round(valuesMap[key]/sum*100)
        if (key in resultingMap){
          resultingMap[key].push(val)
        }else{
          resultingMap[key] = [val]
        }
      }
    }
    return resultingMap
  }
  transformIntoPercent(resultin){

  }



  sanitizeLabels(list){
    if (list.length==1) return [list, ""];
    const prefix = commonSubstring(list);
    console.log(prefix)
    return [list.map(d=>d.replace(prefix, '')), prefix]
  }

  generateChart(series:any, chartElement:ChartReportElement, include:string[]=undefined):EChartsOption{
    let chartName = chartElement.name;
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices = series["index"]

    if (chartElement.config.type=='groupedPercentAndData'){
      let shareElement=this.transformDataIntoPairs(series).filter(d=>d[0].includes("share"))[0][1]
      let seriesList = this.generateSeriesList(shareElement)
      console.log(shareElement)
      console.log(seriesList)
      console.log(this.getAllShareLabels(shareElement))
      let y= {
        title: {text: chartName},
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        color:"#3b3b3b",
         legend:{
           data:this.getAllShareLabels(shareElement)
         },
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true},
        yAxis:{type:'category', show:true, data:indices},
        series:zip(Object.keys(seriesList), Object.values(seriesList)).map((d,index)=>({
          data:d[1],
          name:d[0],
          type:this.presetsToTypes[chartElement.config.type],
          color:this.defaultColorPalette[index],
          stack: 'total',
          label: {
            show: true,
            formatter: "{c}%"
          },
          emphasis: {
            focus: 'series'
          },
          smooth: false,
          symbol: 'none',
        }))
      } as EChartsOption
      console.log(y)
      return y


    }
    else if (chartElement.config.type == "multipleChoice"){
      let shareElements=this.transformDataIntoPairs(series).filter(d=>d[0].includes("share"))
      console.log(shareElements)
      let categories =shareElements.map(d=>d[0].replace("share ", "").replace(/<[^>]*>/g, ''))
      let commonSubstringResults =  this.sanitizeLabels(categories)
      categories=commonSubstringResults[0]
      chartName = !!chartName?chartName:commonSubstringResults[1]
      //bar series is in the following format
      //[
      //   [
      //     "share <b>Co sprawia, że właśnie tego wykładowcę ocenia P. tak wysoko? Proszę wskazać najważniejsze powody.</b> - ciekawy sposób prowadzenia zajęć",
      //     [
      //       {
      //         "0": 2,
      //         "1": 1
      //       }
      //     ]
      //   ],
      //   [
      //     "share <b>Co sprawia, że właśnie tego wykładowcę ocenia P. tak wysoko? Proszę wskazać najważniejsze powody.</b> - inne - komentarz",
      //     [
      //       {}
      //     ]
      //   ],
      //   [
      //     "share <b>Co sprawia, że właśnie tego wykładowcę ocenia P. tak wysoko? Proszę wskazać najważniejsze powody.</b> - jasny i czytelny sposób przekazywania wiedzy",
      //     [
      //       {
      //         "0": 3
      //       }
      //     ]
      //   ],
      //   [
      //     "share <b>Dlaczego dokonał/a/by P. innego wyboru kierunku / specjalności?</b> - Inne",
      //     [
      //       {
      //         "9999": 3
      //       }
      //     ]
      //   ],
      //   [
      //     "share <b>Dlaczego dokonał/a/by P. innego wyboru kierunku / specjalności?</b> - Inne - komentarz",
      //     [
      //       {}
      //     ]
      //   ],
      //   [
      //     "share <b>Dlaczego dokonał/a/by P. innego wyboru kierunku / specjalności?</b> - Jakość nauczania",
      //     [
      //       {
      //         "9999": 3
      //       }
      //     ]
      //   ],
      //   [
      //     "share <b>Dlaczego dokonał/a/by P. innego wyboru kierunku / specjalności?</b> - Kadra dydaktyczna",
      //     [
      //       {
      //         "9999": 3
      //       }
      //     ]
      //   ],
      //   [
      //     "share <b>Dlaczego dokonał/a/by P. innego wyboru kierunku / specjalności?</b> - Konstrukcja programu studiów",
      //     [
      //       {
      //         "9999": 3
      //       }
      //     ]
      //   ],
      //   [
      //     "share <b>Dlaczego dokonał/a/by P. innego wyboru kierunku / specjalności?</b> - Motywy osobiste(zmiana zainteresowań, odległość od domu itd.)",
      //     [
      //       {
      //         "9999": 3
      //       }
      //     ]
      //   ]
      // ]
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
        return sum!=0?(1 in d[1][0])?Math.round(d[1][0]['1']/sum*100):0:0
      })
      console.log("categories")
      console.log(categories)
      console.log("barSeries")
      console.log(barSeries)
      let o = zip(categories,barSeries).sort((a,b)=>a[1]-b[1])
      categories=o.map(d=>d[0])
      barSeries=o.map(d=>d[1])
      return {
        title: {text: chartName},
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        color:"#3b3b3b",
        // legend:{
        //  data:this.getAllShareLabels(shareElement)
        // },
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true},
        //@ts-ignore
        yAxis:{type:'category', show:true, data:categories, axisLabel:{overflow:"break"}},
        series:[{

          data:barSeries,
          name:"Procent odpowiedzi",
          type:'bar',
          color:"red",
          stack: 'total',
          label: {
            show: true,
            formatter: "{c}%"
          },
          emphasis: {
            focus: 'series'
          },


        }]
      }
    }
    else if (chartElement.config.type == "groupedBars"){
      let shareElement=this.transformDataIntoPairs(series).filter(d=>d[0].includes("share"))[0][1][0]
      console.log(shareElement)
      let categories =Object.keys(shareElement)
      let values = Object.values(shareElement)
      return {
        title: {text: chartName},
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        color:"#3b3b3b",
        // legend:{
        //  data:this.getAllShareLabels(shareElement)
        // },
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true},
        //@ts-ignore
        yAxis:{type:'category', show:true, data:categories, axisLabel:{overflow:"break"}},
        series:[{
          data:values,
          name:"Ilość odpowiedzi",
          type:'bar',
          color:"red",
          stack: 'total',
          label: {
            show: true,
            formatter: "{c}"
          },
          emphasis: {
            focus: 'series'
          },


        }]
      }
    }
    else if (chartElement.config.type=="multipleBars") {
      const xAxisLabels = series.index
      let shareElement=this.transformDataIntoPairs(series).filter(d=>d[0].includes("share"))[0][1]
      let seriesList = this.generateSeriesList(shareElement)
      //get only values and transpose
      const transpose = m => m[0].map((x,i) => m.map(x => x[i]))
      let barSeries = Object.values(seriesList).map((d:number[])=>{
        let sum=0;
        try {
          sum = d.reduce((previousValue: number, currentValue: number, index, array) => previousValue + currentValue) as number
        }
        catch (e){
          console.log("could not count responses amount")
          console.log(e)
        }
        console.log(d)
        console.log(sum)
        return (JSON.parse(JSON.stringify(d)) as number[]).map(i=>Math.round(i/sum*100))
      })
      console.log(shareElement)
      console.log(seriesList)
      console.log(this.getAllShareLabels(shareElement))
      console.log(barSeries)
      console.log(zip(this.getAllShareLabels(shareElement), barSeries))
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
          options: posList.reduce(function (map, pos) {
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


      var labelOption = <SeriesLabelOption>{
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        // formatter: '{c}%  {name|{a}}',
         formatter: '{c}%',
        fontSize: 12,
        rich: {
          name: {
          }
        }
      };

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.getAllShareLabels(shareElement)
        },

        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            //rok, stopień lub kierunek
            data: xAxisLabels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true},
        series:
          //każda seria to jeden słupek w tej samej pozycji ale w różnych grupach
         zip(this.getAllShareLabels(shareElement), barSeries).map(d=>({
            name: d[0],
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: d[1]
          }))





    }}
    // if (include)
    //   values = Object.fromEntries(
    //     Object.entries(values)
    //       .filter(([key]) => include.includes(key))
    //   )
    // return {
    //   color:"#3b3b3b",
    //   grid:{left:50,top:25,right:25,bottom:25, show:true},
    //   xAxis:{type:'category', show:true, animation:true, scale:true},
    //   yAxis:{type:'value', show:true},
    //   series:zip(Object.keys(values), Object.values(values)).map((d,index)=>({
    //     data:zip(indices,d[1]),
    //     label:d[0],
    //     type:this.presetsToTypes[chartElement.config.type],
    //     color:this.defaultColorPalette[index],
    //     smooth: false,
    //     symbol: 'none',
    //   }))
    // }
  }
}
