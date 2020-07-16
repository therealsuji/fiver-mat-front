import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from "@angular/router";
import { Observable, of } from "rxjs";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { take, map } from "rxjs/operators";
import { UserAuth } from "../services/user-auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private alertCtrl: AlertController, private authService: UserAuth) {}

  canActivate(): Observable<boolean> {
    console.log("auth guard");
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        
        
        if (!user) {
          this.alertCtrl
            .create({
              header: "Not Logged",
              message: "You are not logged in",
              buttons: ["Ok"],
            })
            .then((alert) => alert.present());
          this.router.navigateByUrl("/");
          return false;
        } else {
          console.log("im logged in");
          return true;
        }
      })
    );
  }
}
