import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate:[LoginGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path:'',
    pathMatch:"full",
    redirectTo:'/login'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path:"app",
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    
  },
  {
    path: 'registration-form/:user_id',
    loadChildren: () => import('./pages/registration-form/registration-form.module').then( m => m.RegistrationFormPageModule)
  },
  {
    path: 'continue-reg',
    loadChildren: () => import('./pages/continue-reg/continue-reg.module').then( m => m.ContinueRegPageModule)
  },
 
 
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
