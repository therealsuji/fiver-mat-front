import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyperformancePageRoutingModule } from './myperformance-routing.module';

import { MyperformancePage } from './myperformance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyperformancePageRoutingModule
  ],
  declarations: [MyperformancePage]
})
export class MyperformancePageModule {}
