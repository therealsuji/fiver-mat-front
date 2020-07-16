import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: "root",
})
export class UserDetailsService {
  constructor(private constants: ConstantsService, private http: HttpClient) {}

  saveUserPhotos(data){
    return this.http.post(this.constants.baseAppUrl + "user-file-upload", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  saveBasicDetails(data) {
    return this.http.post(this.constants.baseAppUrl + "basic-details", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  saveFamilyDetails(data) {
    return this.http.post(this.constants.baseAppUrl + "family-details", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  saveChurchDetails(data) {
    return this.http.post(this.constants.baseAppUrl + "church-details", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  savePersonalDetails(data) {
    return this.http.post(this.constants.baseAppUrl + "personal-details", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  savePhysicalDetails(data) {
    return this.http.post(this.constants.baseAppUrl + "physical-details", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUserPhotos(id) {
    return this.http.get(this.constants.baseAppUrl + "user-photos/" + id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getBasicDetails(id) {
    return this.http.get(this.constants.baseAppUrl + "basic-details/" + id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getFamilyDetails(id) {
    return this.http.get(this.constants.baseAppUrl + "family-details/" + id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getChurchDetails(id) {
    return this.http.get(this.constants.baseAppUrl + "church-details/" + id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getPersonalDetails(id) {
    return this.http.get(this.constants.baseAppUrl + "personal-details/" + id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getPhysicalDetails(id) {
    return this.http.get(this.constants.baseAppUrl + "physical-details/" + id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getAnnualIncome() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-annual-income").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getMartialStatus() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-martial-status").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getBloodGroup() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-blood-group").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getBodyType() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-body-type").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getDenomination() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-denomination").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getOccupation() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-occupation").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getPartnerExpectation() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-partner-expectation").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getLanguage() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-language").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getHeight() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-height").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getDiet() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-diet").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getComplexion() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-complexion").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getHighestEducation() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-heightest-education").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getCountries() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-country").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getSates(id) {
    return this.http.get(this.constants.baseAppUrl + "fields/get-state/"+id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getCities(id) {
    return this.http.get(this.constants.baseAppUrl + "fields/get-city/"+id).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  getMinistry() {
    return this.http.get(this.constants.baseAppUrl + "fields/get-ministry").pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
