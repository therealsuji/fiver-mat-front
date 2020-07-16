import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignUPService {

  constructor(private http: HttpClient, private router: Router) {
  }

  createAccount(loginObject): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'signup/customer-signup', loginObject).pipe(
      map(response => {
        return response;
      })
    );
  }

  otp(loginObject): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'signup/customer-otp-request', loginObject).pipe(
      map(response => {
        return response;
      })
    );
  }


}
