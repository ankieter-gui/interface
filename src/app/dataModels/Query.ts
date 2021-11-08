import {GlobalFilter} from './ReportDefinition';
import {Query} from '@angular/core';

export class SurveyQuery{
  static possibleAggregations = ["share","max","min","mode","mean","median","std","var","count","sum"]
  get: string[][]=[[]]
  as: ("share"|"max"|"min"|"mode"|"mean"|"median"|"std"|"var"|"count"|"sum")[]=[]
  by: string[] = [];
  filter: [string, '>' | '<' | '=' | '!=' | '<=' | '>=' | 'top' | 'low' | 'in' | 'notin', string?, string?][] = [];
  constructor() {
    this.get=[[]]
    this.as=[]
    this.by=[]
    this.filter=[]
  }
}

export let ComplimentQuery = (query: SurveyQuery, globalFilter: GlobalFilter[] = null, localFilter: GlobalFilter[] = null, ignore=[]): SurveyQuery => {

  let exceptFilter:GlobalFilter[] = []
  localFilter=localFilter.filter(x=>x!=undefined)
  console.log(localFilter)
  console.log(exceptFilter)
  if (localFilter){
    exceptFilter = [...exceptFilter, ...localFilter.filter(x=>x.except)]
    localFilter=localFilter.filter(x=>!x.except)
  }
  if (globalFilter){
    exceptFilter = [...exceptFilter, ...globalFilter.filter(x=>x.except)]
    globalFilter=globalFilter.filter(x=>!x.except)
  }
  console.log(exceptFilter)
  let q2: SurveyQuery = JSON.parse(JSON.stringify(query)) as SurveyQuery;
  // while (q2.as.length > q2.get[0].length) {
  //   q2.get[0].push(q2.get[0][0]);
  // }
  let questions = {};
  if (globalFilter) {
    if (!q2.filter) {
      q2.filter = [];
    }

    globalFilter.forEach(d => {

      if (!questions[d.question]) {
        questions[d.question] = [];
      }
      questions[d.question].push(d.answer);

    });
  }
  if (localFilter) {
    if (!q2.filter) {
      q2.filter = [];
    }
    localFilter = localFilter.filter(f => f);
    localFilter.forEach(d => {
      if (!questions[d.question]) {
        questions[d.question] = [];
      }
      questions[d.question].push(d.answer);
    });

    Object.entries(questions).forEach(d => {
      // @ts-ignore
      q2.filter.push([d[0], 'in', ...d[1]]);
    })

  }
  if (q2.filter) {
    q2['if'] = q2.filter;
  }
  const notInQuestions = [...q2.by.flat(), ...q2.get.flat()].map(d => [d, 'notin', '9999', '999']);
  notInQuestions.forEach(d => {
    if (d[0] != '*') {
      q2['if'].push(d);
    }
  });
  if (q2['if'].length == 0) {
    delete q2['if'];
  }
  delete q2['filter'];
  if (ignore) {
    //check the indices of 'as' aggregations that shall ignore some values selected by the user
    let excludeList = ["share", "count"]
    let includeList = SurveyQuery.possibleAggregations.filter(d => !excludeList.includes(d))
    // @ts-ignore
    let indices = includeList.map(d => query.as.indexOf(d)).filter(d => d !== -1)
    let ignoreFilters = indices.map(d => [Number(d), "notin", ...ignore])
    console.log(ignoreFilters)
    if (!q2['if']){q2['if']=[]}
    q2['if']= [...q2['if'], ...ignoreFilters]
  }
  if (exceptFilter){
    q2['except']=[]
    let exceptDict = {}
    exceptFilter.forEach(x=>{
      if(!exceptDict[x.question]) exceptDict[x.question]=[]
      exceptDict[x.question].push(x.answer)
    })
  //@ts-ignore
    q2['except'] = Object.entries(exceptDict).map(x=>[x[0],'in',...x[1].flat()])

  }
  return q2;
}
export let SurveyQueryNamingDictionary = {
  'share': 'udział',
  'max': 'maksimum',
  'min': 'minimum',
  'mode': 'dominanta',
  'median': 'me',
  'mean': 'śr',
  'std': 'SD',
  'var': 'wariancja',
  'count': 'N',
  'sum': 'suma'
}


