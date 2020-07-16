import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private  router: Router) {
  }

  getOTP(loginObject): Observable<any> {
      return this.http.post(GlobalVar.BASE_API_URL + 'login/customer-login-otp-request', loginObject).pipe(
          map(response => {
              return response;
          })
      );
  }

  loginWithOTP(loginObject): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'login/customer-login', loginObject).pipe(
        map(response => {
            return response;
        })
    );
}



}
