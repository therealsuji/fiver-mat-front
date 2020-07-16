import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then(m => m.OtpPageModule)
  },

  {
    path: 'gmap-address',
    loadChildren: () => import('./gmap-address/gmap-address.module').then(m => m.GmapAddressPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPageRoutingModule { }
