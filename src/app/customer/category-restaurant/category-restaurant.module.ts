import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryRestaurantPageRoutingModule } from './category-restaurant-routing.module';

import { CategoryRestaurantPage } from './category-restaurant.page';
import { SharedModule } from './../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryRestaurantPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoryRestaurantPage]
})
export class CategoryRestaurantPageModule { }
