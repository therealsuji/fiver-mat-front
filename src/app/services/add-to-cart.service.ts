import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getProductDetails(access_token, productId): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'inventory/find-by-product/'+productId+'?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }


}
