import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { CANCELLED } from 'dns';
import { take } from 'rxjs/internal/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(private homeService: HomeService) { }
  orders;
  orderStatuses = OrderStatus;
  ngOnInit() {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getPastOrders(access_token).pipe(take(1)).toPromise().then((res) => {
      this.orders = res;
    });
  }

  getStatus(status: OrderStatus) {
    switch (status) {
      case OrderStatus.CANCELLED:
        return 'Cancelled';
        break;
      case OrderStatus.CONFIRMED:
        return 'Confirmed';
        break;
      case OrderStatus.PREPPING:
        return 'Prepping';
        break;
      case OrderStatus.READY:
        return 'Ready';
        break;
      case OrderStatus.DISPATCH:
        return 'Dispatch';
        break;
      case OrderStatus.DELIVERED:
        return 'Delivered';
        break;
    }
  }

  async doRefresh(event) {
    const access_token = localStorage.getItem('access_token');
    this.homeService.getPastOrders(access_token).pipe(take(1)).toPromise().then((res) => {
      setTimeout(() => {
        this.orders = res;
        event.target.complete();
      }, 500);
    });

  }
}
enum OrderStatus {
  CANCELLED = 1,
  CONFIRMED = 2,
  PREPPING = 3,
  READY = 4,
  DISPATCH = 5,
  DELIVERED = 6
}