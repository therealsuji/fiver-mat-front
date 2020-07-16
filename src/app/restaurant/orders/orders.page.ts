import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderDetailsComponent } from './../../components/restaurant/order-details/order-details.component';
import { OrdersService } from '../services/orders.service';
import { Observable, Subscription, interval, timer, of } from 'rxjs/index';
import { switchMap, catchError, map, startWith, flatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  selectedSegment: OrderState;
  allStates = OrderState;

  newOrders: Observable<any>;
  prepOrders: Observable<any>;
  readyOrders: Observable<any>;

  newOrderSubscription: Subscription;
  prepOrdersSubscription: Subscription;
  readyOrdersSubscription: Subscription;


  constructor(private modalController: ModalController, private ordersService: OrdersService) {
    this.selectedSegment = this.allStates.NEW;

  }

  ngOnInit() {
    this.checkForOrderUpdate();
  }

  checkForOrderUpdate() {
    const access_token = localStorage.getItem('access_token');
    this.newOrderSubscription = interval(10000).pipe(
      startWith(0),
    ).subscribe(_ => {

      this.newOrders = this.ordersService.getOrders(access_token, 16, 1);
    });
    this.prepOrdersSubscription = interval(10000).pipe(
      startWith(0),

    ).subscribe(_ => {
      this.prepOrders = this.ordersService.getOrders(access_token, 16, 2);
    });
    this.readyOrdersSubscription = interval(10000).pipe(
      startWith(0),
    ).subscribe(_ => {
      this.readyOrders = this.ordersService.getOrders(access_token, 16, 4);
    });



  }

  onSegmentChanged(segmentButton) {
    this.selectedSegment = segmentButton.target.value;
  }

  async openOrder(data) {
    const modal = await this.modalController.create({
      component: OrderDetailsComponent,
      componentProps: { item: data, isDriver: false }
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.newOrderSubscription.unsubscribe();
    this.prepOrdersSubscription.unsubscribe();
    this.readyOrdersSubscription.unsubscribe();

  }

}

enum OrderState {
  NEW,
  PREPARING,
  READY
}
