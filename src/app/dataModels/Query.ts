import {GlobalFilter} from './ReportDefinition';

export class SurveyQuery{
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

export let ComplimentQuery = (query: SurveyQuery, globalFilter: GlobalFilter[] = null, localFilter: GlobalFilter[] = null): SurveyQuery => {

  let q2: SurveyQuery = JSON.parse(JSON.stringify(query)) as SurveyQuery;
  while (q2.as.length > q2.get[0].length) {
    q2.get[0].push(q2.get[0][0]);
  }
  let questions = {};
  if (globalFilter) {
    if (!q2.filter) {
      q2.filter = [];
    }

    globalFilter.forEach(d => {
      //TODO: czekać na backend
      if (!questions[d.question]) {
        questions[d.question] = [];
      }
      questions[d.question].push(d.answer);

    });
  }
  if (localFilter && localFilter) {
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
  'var': 'wariacja',
  'count': 'N',
  'sum': 'suma'
}


