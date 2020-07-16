import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
import { NgForm, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { of } from 'rxjs';
import { AppState } from './../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { AddItemAction } from 'src/app/store/actions/shopping.actions';
import { ShoppingItem, ShoppingCart } from '../../store/models/shopping.model';
import { NavController, AlertController } from '@ionic/angular';
import { take } from 'rxjs/internal/operators';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {

  currentQty: number = 1;
  maxVal = 999;
  productInfoList = [];
  theData = '0';
  currentSelectedItem = null;
  unitPrice = 0.00;
  currentPrice = 0.00;

  orderForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private addToCartService: AddToCartService,
    private _formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {

    this.orderForm = this._formBuilder.group({
      orders: [''],
      currentQty: new FormControl(1),
      specialInstructions: new FormControl(null)
    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('productId')) {
        return;
      }
      const productId = paramMap.get('productId');
      this.getProductDetails(productId);
    })

  }

  ngOnInit() {

  }

  assignValue(item: any) {
    this.orderForm.controls['currentQty'].setValue(1);
    this.orderForm.controls.orders.patchValue(item.mbinId);
    this.currentSelectedItem = item;
    this.unitPrice = item.mbinPrice;
    this.currentPrice = this.unitPrice;
  }

  getProductDetails(productId: any) {
    const access_token = localStorage.getItem('access_token');
    this.addToCartService.getProductDetails(access_token, productId).subscribe(response => {
      if (!response.isError) {
        this.productInfoList = response.items;
        if (this.productInfoList.length) {
          this.orderForm.controls['orders'].setValue(this.productInfoList[0].mbinId);
          this.assignValue(this.productInfoList[0]);
        }
        localStorage.setItem('brandId', this.productInfoList[0].mbinBrandId)
        console.log(response)
      }
    });
  }

  onSubmit() {
    let shoppingItem: ShoppingItem = {
      pname: this.currentSelectedItem.mbinItemName,
      iname: this.currentSelectedItem.mbinItemName,
      master_id: this.currentSelectedItem.mbinMasterItemCode,
      text: this.orderForm.value.specialInstructions,
      count: this.orderForm.value.currentQty,
      unit_price: this.currentSelectedItem.mbinPrice,
      brand_id: this.currentSelectedItem.mbinBrandId,
      image: 'chocolate-fudge-cake-2lbs-14513.jpg',
    }
    this.store.dispatch(new AddItemAction(shoppingItem));
    this.store.select(store => store.shopping).pipe(take(1)).subscribe(async (cart: ShoppingCart) => {

      if (!cart.addItemStatus) {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Attention',
          message: 'We currently do not support adding products from multiple restaurant',
          buttons: ['OK']
        });
        await alert.present();
        alert.onDidDismiss().then(() => {
          this.navCtrl.back();
        })
      } else {
        this.navCtrl.back();
      }
    });
  }

  numberOnlyValidation(event: any) {

    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.target.value.length > 2) {
      event.preventDefault();
    }
    if (!pattern.test(inputChar)) {

      event.preventDefault();
    }
  }
  changeQtyVal(val) {
    if ((this.orderForm.value.currentQty == 1 && val == -1) || (this.orderForm.value.currentQty == this.maxVal && val == 1)) {
      return;
    }
    this.currentQty = this.orderForm.value.currentQty;
    this.currentQty += parseInt(val);
    this.currentPrice = this.unitPrice * this.currentQty;
    this.orderForm.controls['currentQty'].setValue(this.currentQty);
  }
}
