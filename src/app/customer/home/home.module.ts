import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { HomeRestaurantTileComponent } from "src/app/components/home-restaurant-tile/home-restaurant-tile.component";
import { HomeCuisineTileComponent } from 'src/app/components/home-cuisine-tile/home-cuisine-tile.component';
import { HomeCarouselComponent } from './../../components/home-carousel/home-carousel.component';
import { SharedModule } from './../shared.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule],
  declarations: [HomePage, HomeCarouselComponent, HomeRestaurantTileComponent, HomeCuisineTileComponent],
  providers: [Geolocation]
})
export class HomePageModule { }
