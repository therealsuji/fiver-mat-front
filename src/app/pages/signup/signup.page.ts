import { Component, OnInit } from "@angular/core";
import { UserAuth } from "src/app/services/user-auth.service";
import { LoadingHelperService } from "src/app/services/loading-helper.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {

  constructor(private userAuth: UserAuth, private loadingService: LoadingHelperService, private router: Router) {}
  mobileNumber = "";
  error = "";
  state = {
    signup: true,
  };
  ngOnInit() {}

  async registerUser() {
    if (this.mobileNumber == "") {
      this.error = "Please enter your mobile number";
      return;
    }
    if (this.mobileNumber.toString().length < 9) {
      this.error = "Please enter a valid mobile number";
      return;
    }
     
    await this.loadingService.presentLoading();
    this.userAuth.registerUser(this.mobileNumber).subscribe(
      async (res: any) => {
        console.log(res);

        if (res.success) {
          this.error = "";
          this.loadingService.dismissLoader();
          await this.loadingService.onDidDismiss();
          let navigationExtras: NavigationExtras = {
            state: {
              signup: this.state,
            },
          };
          this.router.navigateByUrl(`registration-form/${res.user_id}`, navigationExtras);
        } else {
          this.error = "";
          this.loadingService.dismissLoader();
          await this.loadingService.onDidDismiss();
          this.loadingService.presentAlert("Attention", "An account with that mobile number has already registered");
        }
      },
      async (error) => {
        this.error = "";
        console.error(error)
        console.error("ERROR!!!!"+JSON.stringify(error) );
        this.loadingService.dismissLoader();
        await this.loadingService.onDidDismiss();
        this.loadingService.presentAlert("Whoops", "Something somewhere somehow went wrong");
      }
    );
  }
}
