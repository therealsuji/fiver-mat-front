import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinueRegPage } from './continue-reg.page';

const routes: Routes = [
  {
    path: '',
    component: ContinueRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinueRegPageRoutingModule {}
