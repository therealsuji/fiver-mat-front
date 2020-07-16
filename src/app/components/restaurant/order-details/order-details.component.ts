import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdersService } from 'src/app/restaurant/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  constructor(private modalController: ModalController, private ordersService: OrdersService) { }
  @Input() item;
  @Input() isDriver;
  private _access_token;

  customerName;
  address;
  orderDetails;
  ngOnInit() {
    this._access_token = localStorage.getItem('access_token');

    console.log(this.item);
    this.customerName = JSON.parse(this.item.mborBillingAddress).fname + " " + JSON.parse(this.item.mborBillingAddress).lname;
    this.address = JSON.parse(this.item.mborBillingAddress).add1 + " " + JSON.parse(this.item.mborBillingAddress).add2;
    this.orderDetails = JSON.parse(this.item.mborOrderDetails);

  }

  unlockedHandler(event: boolean, status) {
    this.ordersService.changeOrderStatus(this._access_token, this.item.mborId, status).subscribe((res) => {
      if (status == 5) {
        window.location.href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(this.address);
      } else {
        this.dismiss();
      }
    });
  }

  changeStatus(status) {
    this.ordersService.changeOrderStatus(this._access_token, this.item.mborId, status).subscribe((res => {
      this.dismiss();
    }));
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
