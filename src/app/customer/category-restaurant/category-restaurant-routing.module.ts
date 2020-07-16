import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryRestaurantPage } from './category-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRestaurantPageRoutingModule {}
