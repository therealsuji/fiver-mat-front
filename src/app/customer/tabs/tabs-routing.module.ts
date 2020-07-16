import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),

          },
          {
            path: 'restaurant-details/:brandId/:brandName',
            loadChildren: () => import('../restaurant-details/restaurant-details.module').then(m => m.RestaurantDetailsPageModule)
          },
        ]
      },
      {
        path: 'search/:search_string',
        loadChildren: () => import('../search-page/search-page.module').then(m => m.SearchPagePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
      },

      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },

      {
        path: '**',
        redirectTo: '/app/tabs/home',
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
