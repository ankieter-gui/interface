//Plik zawiera makra z typami pytań uzupełnionymi o odpowiednie dane
import {SingleChoiceQuestion} from './SurveyDefinition';

export const wydzial = ()=>{
  const returnObject = new  SingleChoiceQuestion()
  returnObject.options = [
    {code: '1', value:"Wydział testowy"}
  ]
  return returnObject
}
export const kierunkiWydzialAnglistyki = ()=>{

}
