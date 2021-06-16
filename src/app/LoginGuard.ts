import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from './user.service';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private user: UserService, private window: Window) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;

   if (this.user.logged()){ return true;}else {

     // not logged in so redirect to login page with the return url
     //this.window.location.href = 'http://localhost:5000';
     return false;
   }
  }
}



@Injectable()
export class OnlyAdminGuard implements CanActivate {

  constructor(private router: Router, private user: UserService, private window: Window) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.user.userResponse) return false;
    if (this.user.userResponse.role=="s"){ return true;}else {

      // not logged in so redirect to login page with the return url
      //this.window.location.href = 'http://localhost:5000';
      return false;
    }
  }
}
