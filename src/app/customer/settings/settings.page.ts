import { Component, OnInit } from '@angular/core';
import { GmapsService } from 'src/app/services/gmaps.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private gMapService: GmapsService, private navCtrl: NavController) { }
  username;
  address1;
  address2;
  ngOnInit() {
    this.username = localStorage.getItem('user_fullname');
    this.getUserDetails();
  }
  getUserDetails() {
    const access_token = localStorage.getItem('access_token');
    this.gMapService.getCurrentUserDetails(access_token).subscribe(res => {
      if (!res.isError) {
        this.address1 = res.object.mbcuAddress;
        this.address2 = res.object.mbcuAddresstwo;
      }
    })
  }

  logOut() {
    localStorage.clear();
    this.navCtrl.navigateBack('/customer', { replaceUrl: true });
  }
}
