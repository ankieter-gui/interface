import { Injectable } from '@angular/core';
import {DeclarationAttributes, QuestionnaireRoot, SurveyDefinition, TextQuestion} from './dataModels/SurveyDefinition';
import {json2xml} from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class SurveyGeneratorService {

  constructor() { }
  getNewEmpty():SurveyDefinition{
   const u = new SurveyDefinition()

    return u
  }
}
