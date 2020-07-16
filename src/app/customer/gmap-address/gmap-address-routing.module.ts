import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GmapAddressPage } from './gmap-address.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: GmapAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class GmapAddressPageRoutingModule {}
