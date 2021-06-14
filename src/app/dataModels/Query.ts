import {GlobalFilter} from './ReportDefinition';

export class SurveyQuery{
  get: string[][]=[[]]
  as: ("share"|"max"|"min"|"mode"|"mean"|"median"|"std"|"var"|"count"|"sum")[]=[]
  by:string[]=[]
  filter: [string, ">"|"<"|"="|"!="|"<="|">="|"top"|"low"|"in", string, string?][]=[]
  constructor() {
    this.get=[[]]
    this.as=[]
    this.by=[]
    this.filter=[]
  }
}
export let ComplimentQuery = (query:SurveyQuery, globalFilter:GlobalFilter=null):SurveyQuery=>{

  let q2= new SurveyQuery()
  q2=JSON.parse(JSON.stringify(query))
  while (q2.as.length>q2.get[0].length){
    q2.get[0].push(q2.get[0][0])
  }
  console.log(q2);
  if (globalFilter){
    if (!q2.filter) q2.filter=[]
    q2.filter.push([globalFilter.question, '=', globalFilter.answer])
  }
  if (q2.filter) q2['if'] = q2.filter

  if (q2['if'].length ==0){
    delete q2['if'];
  }
  delete q2['filter'];
  return q2;
}
export let SurveyQueryNamingDictionary = {
  "share":"udział",
  "max":"maksimum",
  "min":"minimum",
  "mode":"dominanta",
  "median":"mediana",
  "mean":"średnia",
  "std":"odchylenie",
  "var":"wariacja",
  "count":"ilość",
  "sum":"suma"
}


