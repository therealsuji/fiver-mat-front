import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: 'customer',
    children: [
      {
        path: '',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerPageModule),
      },
    ]
  },
  {
    path: 'app',
    redirectTo: 'app/tabs/home',
    pathMatch: 'full'
  },

  {
    path: 'app',
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./customer/tabs/tabs.module').then(m => m.TabsPageModule),
      },
      {
        path: 'add-to-cart/:productId',
        loadChildren: () => import('./customer/add-to-cart/add-to-cart.module').then(m => m.AddToCartPageModule)
      },
      {
        path: 'check-out',
        loadChildren: () => import('./customer/check-out/check-out.module').then(m => m.CheckOutPageModule)
      },
      {
        path: 'category-restaurant/:id',
        loadChildren: () => import('./customer/category-restaurant/category-restaurant.module').then(m => m.CategoryRestaurantPageModule)
      }, {
        path: 'cat-details/:brandId/:brandName/:fromCatPage',
        loadChildren: () => import('./customer/restaurant-details/restaurant-details.module').then(m => m.RestaurantDetailsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./customer/settings/settings.module').then(m => m.SettingsPageModule)
      },

    ]
  },
  {
    path: 'restaurant',
    redirectTo: 'restaurant/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'restaurant',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./restaurant/orders/orders.module').then(m => m.OrdersPageModule)
      },


    ]
  },
  {
    path: 'driver',
    redirectTo: 'driver/tabs',
    pathMatch: 'full'
  },
  {
    path: 'driver',
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./driver/tabs/tabs.module').then(m => m.TabsPageModule)
      },

    ]
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
