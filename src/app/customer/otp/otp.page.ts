import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  otpForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    otp: new FormControl(null)
  });

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {

    const email = localStorage.getItem('email')

    let loginObject = {
      username: email,
      otp: this.otpForm.value.otp
    }

    this.loginService.loginWithOTP(loginObject).subscribe(response => {
      if (!response.isError) {
        localStorage.setItem('access_token',response.object.access_token);
        localStorage.setItem('user_fullname',response.object.fullName);
        this.router.navigateByUrl('app/tabs/home');
      }
    });

  }

}
