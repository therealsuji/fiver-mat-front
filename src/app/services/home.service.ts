import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getBrandsList(access_token): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/list?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStorePickUpBrands(access_token): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/find-store-pickup?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }
  getDeliveryBrands(access_token): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/find-delivery?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBrandCatagoryList(access_token): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'brand-category/list?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBannerImages(access_token): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'banner-images/list?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getPreviousOrders(access_token): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/list-favourite?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getRestaurantFromCategory(access_token, id): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/find-by-category/' + id + '?access_token=' + access_token).pipe(
      map((response: any) => {
        return response.items;
      })
    );
  }

  findProductByName(access_token, payload: { productName: String }): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'products/find-by-name?access_token=' + access_token, payload).pipe(
      map((response: any) => {
        return response.items;
      })
    );
  }

  getPastOrders(access_token) {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/orders/find-by-customer' + '?access_token=' + access_token).pipe(
      map((response: any) => {
        return response.items;
      })
    );
  }

}
