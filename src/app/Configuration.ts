import {isDevMode} from '@angular/core';
import {environment} from '../environments/environment';

export const isProd = environment.production;

const myIp = 'localhost';


export const BACKEND_URL = !isProd ? `http://${myIp}:5000/api` : '/api';
export const FRONTEND_URL = !isProd ? `http://${myIp}:4200` : 'https://ankieter.projektstudencki.pl';
export const LOGIN_SERVICE_URL = !isProd ? `http://${myIp}:5000/api/login` : '/api/login';

export const hidePotentiallyUnsafeQuestions=true;
export const unsafeQuestionsPartialNames=['jakie?'] //pytania są z dwóch różnych źródeł - trzeba to naprawić. Survey i types
