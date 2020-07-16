import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailsPageRoutingModule } from './restaurant-details-routing.module';

import { RestaurantDetailsPage } from './restaurant-details.page';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantDetailsPageRoutingModule
  ],
  declarations: [RestaurantDetailsPage]
})
export class RestaurantDetailsPageModule { }
