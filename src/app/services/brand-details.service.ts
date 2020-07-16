import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandDetailsService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getBrandProductsDetails(access_token, brandId): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'products/find-by-brand/'+brandId+'?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBrandDetails(access_token, brandId): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/find-brand/'+brandId+'?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  geCategories(access_token, brandId): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/category/find-category/'+brandId+'?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getProductsForCategory(access_token, dto): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'products/find-product?access_token=' + access_token, dto).pipe(
      map(response => {
        return response;
      })
    );
  }


}
