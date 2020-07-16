import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GmapAddressPageRoutingModule } from './gmap-address-routing.module';

import { GmapAddressPage } from './gmap-address.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GmapAddressPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [GmapAddressPage],
  providers:[Geolocation]
})
export class GmapAddressPageModule {}
