import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { startWith } from 'rxjs/internal/operators';
import { ModalController } from '@ionic/angular';
import { OrdersService } from 'src/app/restaurant/services/orders.service';
import { OrderDetailsComponent } from 'src/app/components/restaurant/order-details/order-details.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  selectedSegment = 1;
  readyOrders: Observable<any>;
  readyOrdersSubscription: Subscription;
  doneOrdersSubscription: Subscription;
  doneOrders: Observable<any>;
  constructor(private modalController: ModalController, private ordersService: OrdersService) { }

  ngOnInit() {
    this.checkForOrderUpdate();
  }

  checkForOrderUpdate() {
    const access_token = localStorage.getItem('access_token');
    this.readyOrdersSubscription = interval(10000).pipe(
      startWith(0),
    ).subscribe(_ => {
      this.readyOrders = this.ordersService.getOrders(access_token, 16, 4);
    });
    this.doneOrdersSubscription = interval(10000).pipe(
      startWith(0),
    ).subscribe(_ => {
      this.doneOrders = this.ordersService.getOrders(access_token, 16, 5);
    });
  }
  async openOrder(data) {
    const modal = await this.modalController.create({
      component: OrderDetailsComponent,
      componentProps: { item: data, isDriver: true }
    });
    return await modal.present();
  }
  selectSegment(segmentButton) {
    this.selectedSegment = segmentButton.target.value;
  }
}
