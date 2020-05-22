import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'addCustomer',component:AddCustomerComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
