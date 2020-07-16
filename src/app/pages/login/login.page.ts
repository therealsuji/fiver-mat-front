import { Component, OnInit } from "@angular/core";
import { UserAuth } from "src/app/services/user-auth.service";
import { LoadingHelperService } from "src/app/services/loading-helper.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(private userAuth: UserAuth, private loadingService: LoadingHelperService, private navCtrl: NavController) {}

  credentials = {
    email: "",
    password: "",
  };
  error = "";
  ngOnInit() {}

  async login() {
    if (this.credentials.email != "" && this.credentials.password != "") {
      await this.loadingService.presentLoading();
      this.userAuth.login(this.credentials).subscribe(async (res) => {
        await this.loadingService.dismissLoader();
        await this.loadingService.onDidDismiss();
        if (res.success == false) {
          this.error = "The mobile number or password you entered is incorrect";
        } else {
          if (res.banned) {
            this.error = "";
            this.loadingService.presentAlert("Attention", "You have been from using our services");
            return;
          }

          if (res.registration_complete && res.verified) {
            this.error = "";
            this.navCtrl.navigateForward("app/home", { replaceUrl: true });
          } else {
            if (!res.registration_complete) {
              this.error = "";
              this.loadingService.presentAlert("Attention", "Please complete your registration");
            } else {
              this.error = "";
              this.loadingService.presentAlert("Attention", "Please await until your account is verified");
            }
          }
        }
      });
    } else {
      this.error = "";
      this.loadingService.presentAlert("Attention", "Please enter the mobile number and password");
    }
  }
}
