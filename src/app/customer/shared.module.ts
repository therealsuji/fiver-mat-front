import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRestaurantCardComponent } from 'src/app/components/home-restaurant-card/home-restaurant-card.component';
import { ViewCartStripComponent } from '../components/view-cart-strip/view-cart-strip.component';



@NgModule({
  declarations: [HomeRestaurantCardComponent, ViewCartStripComponent],
  exports: [HomeRestaurantCardComponent, ViewCartStripComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
