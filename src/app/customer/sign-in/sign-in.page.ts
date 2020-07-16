import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignUPService } from 'src/app/services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  signUPForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    mobile: new FormControl(null),
    password: new FormControl(null),
    rePassword: new FormControl(null)
  });

  constructor(private signUPService: SignUPService, private router: Router) { }

  ngOnInit() {
  }

  signUp() {

    let signUpObject = {
      mbcuEmail: this.signUPForm.value.email,
      mbcuName: this.signUPForm.value.firstName,
      mbcuLastname: this.signUPForm.value.lastName,
      mbcuPhone: this.signUPForm.value.mobile
    }

    this.signUPService.createAccount(signUpObject).subscribe(response => {
      if (!response.isError) {
        this.router.navigateByUrl('customer/otp')
        localStorage.setItem('email', this.signUPForm.value.email);
      }
    });

  }

}
