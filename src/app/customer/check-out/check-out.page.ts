import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { ShoppingItem } from '../../store/models/shopping.model';
import { Observable } from 'rxjs/index';
import { ChangeQuantityAction, CheckOutCartAction, ChangeShoppingMode } from 'src/app/store/actions/shopping.actions';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';
import { RouterLink, Router } from '@angular/router';
import { ClearCartAction, DeleteItemAction } from './../../store/actions/shopping.actions';
import { NavController, AlertController } from '@ionic/angular';
import { take, retry } from 'rxjs/internal/operators';
import { GmapsService } from 'src/app/services/gmaps.service';
import { DeliveryMode } from 'src/app/store/models/shopping.model';
import { BrandDetailsService } from 'src/app/services/brand-details.service';
import * as moment from 'moment';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {

  checkoutForm: FormGroup;
  numberOfItems;
  currentUserDetails: any;
  addressLine1 = '';
  addressLine2 = '';
  maxVal = 999;
  constructor(
    private brandDetailsService: BrandDetailsService,
    private store: Store<AppState>,
    private checkoutService: CheckoutService,
    private router: Router,
    private gMapService: GmapsService,
    private alertCtrl: AlertController
  ) { }

  shoppingItems: Observable<ShoppingItem[]>;
  totalValue: number;
  perItemTotalValue: number;
  fullTotalValue: number;
  shoppingMode: DeliveryMode;
  currentBrandName;
  currentBrandId;
  restOutlets = [];
  outletId = '';
  readonly DELIVERY = DeliveryMode.DELIVERY;
  readonly STORE_PICKUP = DeliveryMode.STORE_PICKUP;

  deliveryDate;
  deliveryTime;
  customPopoverOptions: any = {
    header: 'Select restaurant outlet',
  };
  ngOnInit() {
    this.store.select(store => store.shopping).pipe(take(1)).subscribe((res) => {
      this.shoppingMode = res.shoppingMode
      if (res.shoppingMode == this.STORE_PICKUP) {
        this.getOutlets(res.currentBrandId);
      }
    });

    this.shoppingItems = this.store.select(store => store.shopping.cartItems);
    this.shoppingItems.subscribe((items: ShoppingItem[]) => {
      this.totalValue = Object.entries(items).reduce(function (total, pair) {
        const [key, value] = pair;
        return total + value.count * value.unit_price;
      }, 0);
      this.fullTotalValue = this.totalValue + 30
    });
    this.getUserDetails();
    this.getBrandDetails();
  }

  changeQtyVal(id, val) {
    this.store.dispatch(new ChangeQuantityAction(id, val));
  }

  deleteItem(id) {
    this.store.dispatch(new DeleteItemAction(id));
  }

  getUserDetails() {
    const access_token = localStorage.getItem('access_token');
    this.gMapService.getCurrentUserDetails(access_token).subscribe(res => {
      if (!res.isError) {
        this.currentUserDetails = res.object;
        this.addressLine1 = this.currentUserDetails.mbcuAddress;
        this.addressLine2 = this.currentUserDetails.mbcuAddresstwo;
      }
    })
  }

  getOutlets(brandId) {
    const access_token = localStorage.getItem('access_token');
    this.checkoutService.getOutlets(access_token, brandId).pipe(take(1)).subscribe((res) => {
      this.restOutlets = res.items;
    });
  }

  getBrandDetails() {
    const access_token = localStorage.getItem('access_token');
    this.store.select(store => store.shopping.currentBrandId).pipe(take(1)).subscribe((brandId) => {
      if (!brandId) { return; }
      this.brandDetailsService.getBrandDetails(access_token, brandId).pipe(take(1)).subscribe((res) => {
        this.currentBrandId = brandId;
        this.currentBrandName = res.object.brandName;
      });
    });
  }
  async showAlert(message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async checkout() {
    console.log(this.outletId);
    console.log(this.shoppingMode);

    if (this.outletId == '' && this.shoppingMode == this.STORE_PICKUP) {
      this.showAlert("Please select an outlet")
      return;
    }
    if (!this.deliveryDate) {
      this.showAlert("Please select an delivery date")
      return;
    }
    if (!this.deliveryTime) {
      this.showAlert("Please select an delivery time")
      return;
    }

    const access_token = localStorage.getItem('access_token');
    this.shoppingItems.pipe(take(1)).subscribe((orderItems: ShoppingItem[]) => {
      let deliveryDetails = {
        area: '',
        cost: 30,
        date: moment().format('yyyy-MM-DD').toString(),
        time: moment().format('HH:MM').toString()
      }

      let billingAddress = {
        fname: this.currentUserDetails.mbcuName,
        lname: this.currentUserDetails.mbcuLastname,
        email: this.currentUserDetails.mbcuEmail,
        company: "Affno",
        tel: this.currentUserDetails.mbcuPhone,
        add1: this.currentUserDetails.mbcuAddress,
        add2: this.currentUserDetails.mbcuAddresstwo,
        city: this.currentUserDetails.mbcuAddress,
        location_lat: this.currentUserDetails.mbcuLocationLat,
        location_lng: this.currentUserDetails.mbcuLocationLng,
        delivery_time: "06:00 pm - 06:30 pm",
        tel_country_code: "lk",
        country: this.currentUserDetails.mbcuCountry
      }

      let checkoutObj = {
        brandId: localStorage.getItem('brandId'),
        orderMethod: 2,
        total: this.fullTotalValue,
        orderDetails: JSON.stringify(orderItems),
        shippingAddress: '{"fname":"new","lname":"abc","company":"abc","tel":"0710730943","lphone":"0112456789","add1":"ABC Trade amp; Investments Pvt Ltd, Sri Jayawardenepura Kotte, Sri Lanka","location_lat":"6.907958000000001","location_lng":"79.888081","delivery_time":"03:00 pm - 03:30 pm","tel_country_code":"lk"}',
        billingAddress: JSON.stringify(billingAddress),
        deliveryDetails: JSON.stringify(deliveryDetails),
        deliveryDate: moment(this.deliveryDate).format('yyyy-MM-DD').toString(),
        deliveryTime: moment(this.deliveryDate).format('HH:MM').toString(),
        outletId: this.outletId,
        pickUp: this.shoppingMode
      }

      this.store.dispatch(new CheckOutCartAction(checkoutObj, access_token))



    });

  }
  changeMode(mode) {
    if (this.shoppingMode != mode) {
      this.shoppingMode = mode;
      if (mode == this.DELIVERY) {
        this.store.dispatch(new ChangeShoppingMode(DeliveryMode.DELIVERY));
      } else if (mode == this.STORE_PICKUP) {
        this.store.dispatch(new ChangeShoppingMode(DeliveryMode.STORE_PICKUP));
      }
    }
  }
}
