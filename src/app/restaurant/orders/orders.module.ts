import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderDetailsComponent } from 'src/app/components/restaurant/order-details/order-details.component';
import { SliderComponent } from './../../components/slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule
  ],
  declarations: [OrdersPage, OrderDetailsComponent, SliderComponent]
})
export class OrdersPageModule { }
