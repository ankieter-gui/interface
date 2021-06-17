export const isProd=true;

const myIp = "localhost"


export const BACKEND_URL = !isProd?`http://${myIp}:5000/api`:"/api"
export const FRONTEND_URL = !isProd?`http://${myIp}:4200`:"https://ankieter.projektstudencki.pl"
export const LOGIN_SERVICE_URL = !isProd?`http://${myIp}:5000/api`:"/api/login"

