import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { GmapAddressPage } from '../gmap-address/gmap-address.page';
import { GmapsService } from 'src/app/services/gmaps.service';
import { DeliveryMode } from 'src/app/store/models/shopping.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { take } from 'rxjs/internal/operators';
import { ChangeShoppingMode } from './../../store/actions/shopping.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  brandList = [];
  brandCategories = [];
  bannerImagesList = [];
  orderList = [];
  address1;
  address2;

  imageUrl = 'https://test.findmyfood.biz/';
  fullName;

  searchString;
  readonly DELIVERY = DeliveryMode.DELIVERY;
  readonly STORE_PICKUP = DeliveryMode.STORE_PICKUP;
  selectedMode;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    private store: Store<AppState>,
    private gMapService: GmapsService
  ) { }

  ngOnInit() {

    this.getDeliveryBrands();
    this.getBrandCategory();
    this.getBanners();
    this.getCustomerOrders();
    this.fullName = localStorage.getItem('user_fullname');
    this.getUserDetails();
    this.store.select(store => store.shopping.shoppingMode).pipe(take(1)).subscribe((res) => this.selectedMode = res);
  }

  search() {
    console.log(this.searchString);
    this.router.navigateByUrl('app/tabs/search/' + this.searchString);
  }

  changeMode(mode) {
    if (this.selectedMode != mode) {
      this.selectedMode = mode;
      if (mode == this.DELIVERY) {
        this.getDeliveryBrands();
        this.store.dispatch(new ChangeShoppingMode(DeliveryMode.DELIVERY));
      } else if (mode == this.STORE_PICKUP) {
        this.getStorePickUpBrands();
        this.store.dispatch(new ChangeShoppingMode(DeliveryMode.STORE_PICKUP));
      }
    }
  }

  getStorePickUpBrands() {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getStorePickUpBrands(access_token).subscribe(response => {
      if (!response.isError) {
        this.brandList = response.items;
        console.log(response)
      }
    });
  }

  getDeliveryBrands() {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getDeliveryBrands(access_token).subscribe(response => {
      if (!response.isError) {
        this.brandList = response.items;
        console.log(response)
      }
    });
  }

  getBrandCategory() {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getBrandCatagoryList(access_token).subscribe(response => {
      if (!response.isError) {
        this.brandCategories = response.items;
        console.log(response)
      }
    });
  }

  getBanners() {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getBannerImages(access_token).subscribe(response => {
      if (!response.isError) {
        this.bannerImagesList = response.items;
        console.log(response)
      }
    });
  }

  getCustomerOrders() {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getPreviousOrders(access_token).subscribe(response => {
      if (!response.isError) {
        console.log(response.items);
        this.orderList = response.items;
        console.log(response.items);

      }
    });
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



  async openModel() {
    const modal = await this.modalController.create({
      component: GmapAddressPage
      // cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}


