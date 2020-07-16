import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor() { }
  username;
  ngOnInit() {
    this.username = localStorage.getItem('user_fullname');
  }

}
