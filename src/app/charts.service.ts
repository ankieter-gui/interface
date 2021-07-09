import { Injectable } from '@angular/core';
import {ChartReportElement} from './dataModels/ReportElement';
import {EChartsOption} from 'echarts';
import * as lcs from 'node-lcs'
import * as Chance from 'chance'
import {commonSubstring} from './lcs';
import {SeriesLabelOption} from 'echarts/types/src/util/types';
import {ReportsService} from './reports.service';
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
  numberToStringScale = {
    5 : 'bardzo dobrze', 4:'raczej dobrze', 3:'średnio', 2:'raczej źle', 1:'bardzo źle'
  }
  getNumberToStringScale(n){
    if (Number(n) in this.numberToStringScale) return this.numberToStringScale[Number(n)]
    else return n
  }
  fourColorPalette=[
    "#F46D43","#FEE08B","#D8EE8A", "#66BD63", "#078202", "#9F9F9F"
  ]
  fiveColorPalette=[
    "#F46D43","#FEE08B","#FDFEBD", "#D8EE8A", "#66BD63", "#078202", "#9F9F9F"
  ]
  lightBlue="#1e6adb"
  darkBlue="#043b8b"
  horizontalBarHeight=40;

  rateToColorGrade(index,n){
    let y = {
      'bardzo dobrze': "#4AAF5B",
      'raczej dobrze':"#B7E075",
      'średnio':"#FDFEBD",
      'raczej źle':"#FDBE6F",
      'bardzo źle':"#E95638"
    }
    if (n in y) return y[n]
    else return this.fourColorPalette[index]
  }
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
  constructor(private reportService:ReportsService) { }

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
        if (key in valuesMap) val =valuesMap[key]/sum*100
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

  generateChart(series:any, chartElement:ChartReportElement, reportId, namingDictioanry):EChartsOption{
    let chartName = chartElement.name;
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let indices;
    if (series) indices = series["index"]

    if (chartElement.config.type=='groupedPercentAndData'){
      let shareElement=this.transformDataIntoPairs(series).filter(d=>d[0].includes("share"))[0][1]
      let seriesList = this.generateSeriesList(shareElement)
      console.log(shareElement)
      console.log(seriesList)
      chartName = chartName?chartName:chartElement.dataQuery.get[0][0]
      let y= {
     //   title: {text: chartName,textStyle:{overflow:'break', width:800}},
     //    tooltip: {
     //      trigger: 'axis',
     //
     //      // axisPointer: {            // Use axis to trigger tooltip
     //      //   type: 'line'        // 'shadow' as default; can also be 'line' or 'shadow'
     //      // }
     //    },
        color:"#3b3b3b",
        pxHeight: 200,
         legend:{
          // top: 1+chartName.length*0.1+"%",
           data:this.getAllShareLabels(shareElement).map(d=>this.getNumberToStringScale(this.reportService.getLabelFor(namingDictioanry,chartElement.dataQuery.get[0][0],d)))
           //data:this.getAllShareLabels(shareElement).map(d=>this.numberToStringScale[Number(d)])
         },
        grid:{left: '3%',
          right: '4%',
          bottom: "3%",
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true},
        yAxis:{type:'category', show:true, data:
            indices.map(d=>this.getNumberToStringScale(this.reportService.getLabelFor(namingDictioanry,chartElement.dataQuery.by[0], d)))
           // indices.map(d=>this.numberToStringScale[Number(d)])
        },
        series:zip(Object.keys(seriesList), Object.values(seriesList)).map((d,index)=>({
          data:d[1],

          name:this.getNumberToStringScale(this.reportService.getLabelFor(namingDictioanry,chartElement.dataQuery.get[0][0], d[0])),
         // name:this.numberToStringScale[d[0]],
          type:this.presetsToTypes[chartElement.config.type],
          color:this.rateToColorGrade(index,this.getNumberToStringScale(this.reportService.getLabelFor(namingDictioanry,chartElement.dataQuery.get[0][0], d[0]))),
          stack: 'total',
          label: {
            show: true,
            formatter: (options)=> options.value!=0?`${Math.round(options.value)}%`:""
          },
          // emphasis: {
          //   focus: 'series'
          // },
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
        return sum!=0?(1 in d[1][0])?d[1][0]['1']/sum*100:0:0
      })
      console.log("categories")
      console.log(categories)
      console.log("barSeries")
      console.log(barSeries)
      let o = zip(categories,barSeries).sort((a,b)=>a[1]-b[1])
      categories=o.map(d=>d[0])
      barSeries=o.map(d=>d[1])

      return {
       // title: {text: chartName, textStyle:{overflow:'break'}},
       //  tooltip: {
       //    trigger: 'axis',
       //    axisPointer: {            // Use axis to trigger tooltip
       //      type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
       //    }
       //  },
        color:"#64B5CD",
        pxHeight: categories.length*this.horizontalBarHeight,
        // legend:{
        //  data:this.getAllShareLabels(shareElement)
        // },
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          top:"0%",
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true},
        //@ts-ignore
        yAxis:{type:'category', show:true, data:categories, axisLabel:{overflow:"break"}},
        series:[{

          data:barSeries,
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
    else if (chartElement.config.type == "groupedBars"){
      let zip2 = (a,b)=> {
        let x = []
        for (let i =0; i<a.length; i++){

          console.log(a[i], b[i])

          x[i] = [a[i], b[i]]

        }


        return x
      }
      let shareElement=this.transformDataIntoPairs(series).filter(d=>d[0].includes("share"))[0][1][0]
      console.log(shareElement)

      let categories =Object.keys(shareElement)
      let values = Object.values(shareElement)
      console.log(categories)
      console.log(values)
      console.log("o before")
      console.log(categories,values)
      let o = zip2(categories,values).sort((a,b)=>a[1]-b[1])
     // o=o.filter(i=>i)
      console.log("o after sort")
      console.log(JSON.stringify(o))
      categories=o.map(d=>d[0]).map(d=>this.reportService.getLabelFor(namingDictioanry, chartElement.dataQuery.get[0][0], d))
      let idToCategories_tmp = zip(o.map(d=>d[0]), categories)
      let idToCategories={}
      for (let h of idToCategories_tmp){
        idToCategories[h[1]] = h[0]
      }
      values=o.map(d=>d[1])

      let wereAllValuesFilled=false;
      let wasAnyValueFilled=false;
      console.log(JSON.stringify(o))
      if(chartElement.config.handCodedData){
        //if any value was filled
        console.log("handcoded data detected")
        //TODO:could this be done with filter and map?
        for (let i of chartElement.config.handCodedData){
          if (i.value) {wasAnyValueFilled=true;break}
        }

      }
      for (let i of chartElement.config.handCodedData){
      console.log(i.label)
        if (!i.value) {wereAllValuesFilled=false;break}
        wereAllValuesFilled=true;
      }
console.log(wereAllValuesFilled)

      let percentShares={}
      console.log("this is o")
      console.log(JSON.stringify(o))
      if (wereAllValuesFilled) {


        for (let j of o) {
          console.log("this is j")
          if (!j) continue //IDK what happens here
          console.log(j)
          let category=j[0]
          let value=j[1]

          console.log(chartElement.config.handCodedData)
          console.log(category)

            let share = Math.round(value / Number(chartElement.config.handCodedData.filter(d=>d.label===category)[0].value) * 100)
          percentShares[category] = share
        }
        //dodawanie pola z ogółem studentów
        percentShares["łącznie"] =Math.round(Number(values.reduce((a:number, b:number) => a + b))/ Number(chartElement.config.handCodedData.map(d=>Number(d.value)).reduce((a:number,b:number)=>a+b))*100)

      }
      console.log(percentShares)
        values = [...values, {value: Number(values.reduce((a:number, b:number) => a + b)), itemStyle:{color:this.darkBlue}}]
        categories = [...categories, "łącznie"]
      return {
      //  title: {text: chartName.length==0?chartElement.dataQuery.get[0][0]:chartName,textStyle:{overflow:'break'}},
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {            // Use axis to trigger tooltip
      //       type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
      //     }
      //   },
        color:"#3b3b3b",
        pxHeight: categories.length*this.horizontalBarHeight,
        // legend:{
        //  data:this.getAllShareLabels(shareElement)
        // },
        grid:{left: '3%',
          right: '4%',
          bottom: '3%',
          top:"-10%",
          containLabel: true},
        xAxis:{type:'value', show:true, animation:true},
        //@ts-ignore
        yAxis:{type:'category', show:true, data:categories, axisLabel:{overflow:"break"}},
        series:[{
          //barMinHeight:this.horizontalBarHeight,
          data:values,
          name:"Liczba odpowiedzi",
          type:'bar',
          color:this.lightBlue,
          stack: 'total',
          label: {
            show: true,
            //TODO: co z tym?
            formatter: wereAllValuesFilled?(options)=>`${options.name!="łącznie"?percentShares[idToCategories[options.name]]:percentShares[options.name]}% (N=${options.value})`:"{c}"
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
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow'
        //   }
        // },
        legend: {
          data: this.getAllShareLabels(shareElement).map(d=>this.reportService.getLabelFor(namingDictioanry, chartElement.dataQuery.get[0][0], d))
        },
        pxHeight:300,
        xAxis: [
          {
            boundaryGap: false,
            type: 'category',
            axisTick: {show: false},
            //rok, stopień lub kierunek
            data: xAxisLabels.map(d=>this.reportService.getLabelFor(namingDictioanry, chartElement.dataQuery.by[0], d))
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
            name: this.reportService.getLabelFor(namingDictioanry, chartElement.dataQuery.get[0][0], d[0]),
            type: 'bar',
            barGap: 0,
            label: labelOption,
            // emphasis: {
            //   focus: 'series'
            // },
            data: d[1]
          }))





    }}
    else if (chartElement.config.type=="linearCustomData"){
      return {
        pxHeight:250,
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
          minorTick:{show:true},
          data: chartElement.config.handCodedData.map(d=>d.label)
        },
        yAxis: {
          min:Number(Math.min(...chartElement.config.handCodedData.map(d=>Number(d.value))))-0.05*Number(Math.min(...chartElement.config.handCodedData.map(d=>Number(d.value)))),
          type: 'value'
        },
        series: [{
          data: chartElement.config.handCodedData.map(d=>Number(d.value)),
          type: 'line'
        }]
      };
    }
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
