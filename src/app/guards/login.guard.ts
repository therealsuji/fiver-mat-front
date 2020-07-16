import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { Observable, of, from } from "rxjs";
import { map, take, switchMap } from "rxjs/operators";
import { UserAuth } from '../services/user-auth.service';

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private auth: UserAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    console.log('login guard');
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (user) {
          this.router.navigateByUrl('app/home');
        } else {
          return true;
        }
      })
    );
  }
}
