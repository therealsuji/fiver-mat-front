import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CheckOutCartAction, ShoppingActionTypes } from '../actions/shopping.actions';
import { mergeMap } from 'rxjs/internal/operators';
import { CheckoutService } from 'src/app/services/checkout.service';
import { map } from 'rxjs/internal/operators';
import { ClearCartAction } from './../actions/shopping.actions';
import { NavController } from '@ionic/angular';


@Injectable()
export class ShoppingEffects {


    @Effect() checkOut = this.actions.pipe(
        ofType<CheckOutCartAction>(ShoppingActionTypes.CHECKOUT_CART),
        mergeMap(data =>
            this.checkoutService.orderCheckout(data.accessToken, data.payload).pipe(
                map(() => {
                    this.navCtrl.navigateBack('app/tabs/home', { replaceUrl: true });

                    return new ClearCartAction();
                })
            )),
    )
    constructor(private actions: Actions, private checkoutService: CheckoutService, private navCtrl: NavController) {

    }


}