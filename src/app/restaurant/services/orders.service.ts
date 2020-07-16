import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVar } from 'src/app/global';
import { map } from 'rxjs/internal/operators/map';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,) { }


  getOrders(access_token, brandId, status): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'customer-api/orders/find-by-status' + '?access_token=' + access_token, {
      "brandId": brandId,
      "statusId": status
    }).pipe(
      map((response: any) => {
        if (!response.isError) {
          response.items = response.items.map((item) => {
            item.customerName = JSON.parse(item.mborBillingAddress).fname + " " + JSON.parse(item.mborBillingAddress).lname;
            item.customerAddress = JSON.parse(item.mborBillingAddress).add1 + " " + JSON.parse(item.mborBillingAddress).add2;
            return item;
          });
          return response.items.reverse();
        }
      })
    );
  }
  changeOrderStatus(access_token, orderId, status): Observable<any> {
    return this.http.post(GlobalVar.BASE_API_URL + 'customer-api/orders/change-status' + '?access_token=' + access_token, {
      "orderId": orderId,
      "statusId": status
    }).pipe(
      map((response: any) => {
        if (!response.isError) {
          return response.items;
        }
      }));
  }

  getBrandDetails(access_token, brandId): Observable<any> {
    return this.http.get(GlobalVar.BASE_API_URL + 'customer-api/brand/find-brand/' + brandId + '?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }
}
