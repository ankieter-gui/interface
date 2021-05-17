export class SurveyQuery{
  get: string[][]
  as: ("share"|"max"|"min"|"mode"|"mean"|"median"|"std"|"var"|"count"|"sum")[]
  by:string[]
  filter: [string, ">"|"<"|"="|"!="|"<="|">="|"top"|"low"|"in", string, string?][]
}
export let SurveyQueryNamingDictionary = {
  "share":"Udzial","max":"maksimum","min":"minimum","mode":"mediana","mean":"srednia","std":"odchylenie","var":"wariacja","count":"ilosc","sum":"suma"
}


