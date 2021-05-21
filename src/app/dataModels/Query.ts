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
export let ComplimentQuery = (query:SurveyQuery):SurveyQuery=>{
  //TODOD: Jak nie zgadzają się liczny agregacji itd
  let q2= new SurveyQuery()
  Object.assign(q2,  query)
  while (q2.as.length>q2.get[0].length){
    q2.get[0].push(q2.get[0][0])
  }
  console.log(q2);
  return q2;
}
export let SurveyQueryNamingDictionary = {
  "share":"Udzial","max":"maksimum","min":"minimum","mode":"mediana","mean":"srednia","std":"odchylenie","var":"wariacja","count":"ilosc","sum":"suma"
}


