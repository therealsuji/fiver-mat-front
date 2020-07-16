import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient, private router: Router) {
  }

  orderCheckout(access_token, checkoutObj): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'customer-api/orders/save?access_token=' + access_token, checkoutObj).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOutlets(access_token, brandId): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/outlet/list/' + brandId + '?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }


}
