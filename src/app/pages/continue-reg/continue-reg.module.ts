import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinueRegPageRoutingModule } from './continue-reg-routing.module';

import { ContinueRegPage } from './continue-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinueRegPageRoutingModule
  ],
  declarations: [ContinueRegPage]
})
export class ContinueRegPageModule {}
