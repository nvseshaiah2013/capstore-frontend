import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { CustomerGuardService } from './services/customer-guard.service';
import { MerchantGuardService } from './services/merchant-guard.service';
import { AdminGuardService } from './services/admin-guard.service';


const routes: Routes = [
  { path: 'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),canLoad:[AdminGuardService] },
  { path: 'customer', loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule),canLoad:[CustomerGuardService]},
  { path: 'home', component:HomeComponent},
  { path: 'merchant', loadChildren:()=>import('./merchant/merchant.module').then(m=>m.MerchantModule),canLoad:[MerchantGuardService]},
  { path: 'user', loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:'error',component:ServerErrorComponent},
  { path: '', redirectTo :'/home',pathMatch:'full'},
  { path: '**' , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
