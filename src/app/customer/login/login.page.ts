import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  sendOTP() {    

    let loginObject = {
      username: this.loginForm.value.email,
      password: null,
      otp: null
    }

    this.loginService.getOTP(loginObject).subscribe(response => {
      if (!response.isError) {
        this.router.navigateByUrl('customer/otp')
        localStorage.setItem('email', this.loginForm.value.email);
      }
    });

  }

}
