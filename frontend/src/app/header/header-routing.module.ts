import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleGuard } from '../guards/user-role.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent ,canActivate:[UserRoleGuard]},
  { path: 'shop', component: ShopComponent ,canActivate:[UserRoleGuard]},
  { path: 'checkout', component: CheckoutComponent ,canActivate:[UserRoleGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
