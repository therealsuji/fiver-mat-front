import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyperformancePage } from './myperformance.page';

const routes: Routes = [
  {
    path: '',
    component: MyperformancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyperformancePageRoutingModule {}
