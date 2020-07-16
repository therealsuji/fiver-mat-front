import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { ConstantsService } from "./constants.service";
import { Observable, from, BehaviorSubject, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { NavController, Platform } from '@ionic/angular';

const USER_EMAIL = "useremail";
const USER_NAME= "username";
const USER_ID = "userid";
const USER_GENDER = "gender";
@Injectable({
  providedIn: "root",
})
export class UserAuth {
   public user: Observable<any>;
  private authState = new BehaviorSubject(false);

  constructor(private plt:Platform,private http: HttpClient, private constants: ConstantsService, private storage: Storage,    private navCtrl: NavController,
    ) {
    this.loadToken();
  }

  loadToken() {
    // subscribe to the platform first
    // from is used to convert promises to observables
    const platformObs = from(this.plt.ready());
    // once its ready get the token from storage
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(USER_ID));
      }),
      map((token) => {
        console.log(token);
        if (token) {
          console.log("token");
          this.authState.next(true);
          return true;
        } else {
          console.log("no token");
          return null;
        }
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.constants.baseAppUrl + "login-user", credentials).pipe(
      map((data: any) => {
        if (data.success && data.registration_complete == true && data.verified == true) {
          this.authState.next(true);
          this.user = of(data);
          const useremail = from(this.storage.set(USER_EMAIL, credentials.email));
          const username = from(this.storage.set(USER_NAME, data.userName));
          const user_id = from(this.storage.set(USER_ID, data.userId));
          const user_gender = from(this.storage.set(USER_GENDER, data.gender));
        }
        return data;
      })
    );
  }

  

  continueRegistration(email): Observable<any> {
    return this.http.post(this.constants.baseAppUrl + "continue-registration", { username: email }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  registerUser(email) {
    return this.http.post(this.constants.baseAppUrl + "register-user", { username: email }).pipe(
      map((data:any) => {
        return data;
      })
    );
  }

  async getUserId(){
    return this.storage.get(USER_ID);
  }
  async getUserName(){
    return this.storage.get(USER_NAME);
  }
  async getUserGender(){
    return this.storage.get(USER_GENDER);
  }

  logout() {
    
    this.storage.remove(USER_ID).then(() => {
      this.storage.remove(USER_EMAIL);
      this.user = of(null); // this needs to be set null otherwise the login guard wont logout the user
      this.navCtrl.navigateRoot('/');
      this.authState.next(false);
    });
  }
}
