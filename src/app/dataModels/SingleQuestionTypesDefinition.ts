// {
//   "Czy dostrzeg\u0142/a P. zmian\u0119 jako\u015bci zaj\u0119\u0107 w por\u00f3wnaniu z semestrem letnim poprzedniego roku akademickiego?": {
//   "sub_questions": [],
//     "type": "single",
//     "values": {
//     "1": "Zdecydowanie si\u0119 pogorszy\u0142a",
//       "2": "Raczej si\u0119 pogorszy\u0142a",
//       "3": "Pod pewnymi wzgl\u0119dami si\u0119 poprawi\u0142a, pod innymi pogorszy\u0142a",
//       "4": "Raczej si\u0119 poprawi\u0142a",
//       "5": "Zdecydowanie si\u0119 poprawi\u0142a",
//       "6": "Brak zmian",
//       "7": "Nie wiem / Nie dotyczy",
//       "9999": "default"
//   }
// },
export class SingleQuestionTypesDefinition {
  question: string;
  sub_questions: any[] = [];
  values: object;
}
