import { Injectable } from '@angular/core';
import { GlobalVar } from '../global';
import { Router } from '@angular/router';
import { Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  // getLocationData(placeId, apiKey):Observable<any>{
  //   return this.http.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeId+'&key='+apiKey).map(res => res.json());
  // }

  getLocationData(placeId, apiKey):Observable<any>{
    return this.httpClient.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+placeId+'&key='+apiKey)
  }

  getLocationAddress(latitude,lingitude):Observable<any>{
   return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+lingitude+'&key=AIzaSyDIDyV2c2IVBcZLDaK2LvmxUjp8G00hBJo')
  }

  updateBillingAddress(access_token, addressObj): Observable<any> {
    return this.httpClient.post(GlobalVar.BASE_API_URL + 'customer-api/customer/update-delivery-address?access_token=' + access_token, addressObj).pipe(
      map(response => {
        return response;
      })
    );
  }

  saveShippingAddress(access_token, addressObj): Observable<any> {
    return this.httpClient.post(GlobalVar.BASE_API_URL + 'customer-api/shipping/save-delivery-address?access_token=' + access_token, addressObj).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCurrentUserDetails(access_token): Observable<any> {
    return this.httpClient.get(GlobalVar.BASE_API_URL + 'customer-api/customer/customer-details?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  getSavedAddresses(access_token): Observable<any> {
    return this.httpClient.get(GlobalVar.BASE_API_URL + 'customer-api/shipping/find-address?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }

  removeAddress(access_token, id): Observable<any> {
    return this.httpClient.get(GlobalVar.BASE_API_URL + 'customer-api/shipping/remove-address/'+id+'?access_token=' + access_token).pipe(
      map(response => {
        return response;
      })
    );
  }
 
}
