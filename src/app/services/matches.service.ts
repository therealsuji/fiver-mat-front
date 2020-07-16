import { Injectable } from "@angular/core";
import { ConstantsService } from "./constants.service";
import { HttpClient } from "@angular/common/http";
import { map, mergeMap } from "rxjs/operators";
import { from } from "rxjs";
import { UserAuth } from "./user-auth.service";

@Injectable({
  providedIn: "root",
})
export class MatchesService {
  constructor(private constants: ConstantsService, private http: HttpClient, private userAuth: UserAuth) {}
  getAllOppositeGenderUsers(myId) {
    return this.http.get(this.constants.baseAppUrl + "get-all-users").pipe(
      mergeMap((res: any) => {
        return from(this.userAuth.getUserGender()).pipe(
          map((gender) => {
            return res.data.filter((item) => {
              return item.user_id != myId && gender != item.gender;
            });
          })
        );
      })
    );
  }

  getAllUsers(myId){
    return this.http.get(this.constants.baseAppUrl + "get-all-users").pipe(
      map((res: any) => {
        return res.data.filter((item)=> item.user_id != myId);
      })
    );
  }
}
