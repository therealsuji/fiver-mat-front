import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/services/user-auth.service';
import { LoadingHelperService } from 'src/app/services/loading-helper.service';
import { Router, NavigationExtras } from '@angular/router';
import { fail } from 'assert';

@Component({
  selector: 'app-continue-reg',
  templateUrl: './continue-reg.page.html',
  styleUrls: ['./continue-reg.page.scss'],
})
export class ContinueRegPage implements OnInit {
 
  constructor(private userAuth: UserAuth, private loadingService: LoadingHelperService, private router: Router) {}
  mobileNumber = "";
  error = "";

  state = {
    signup: false,
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
    this.userAuth.continueRegistration(this.mobileNumber).subscribe(
      async (res: any) => {
        if (res.success) {
          console.log(res);
          
          this.error = "";
          this.loadingService.dismissLoader();
          await this.loadingService.onDidDismiss();
          let navigationExtras: NavigationExtras = {
            state: {
              signup: this.state,
            },
          };
          this.router.navigateByUrl(`registration-form/${res.userId}`,navigationExtras)
        } else {
          this.error = "";
          this.loadingService.dismissLoader();
          await this.loadingService.onDidDismiss();
          this.loadingService.presentAlert("Attention", "We could not find an account associated with this mobile number");
        }
      }
    );
  }
}
