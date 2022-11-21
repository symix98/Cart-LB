import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddAddressComponent } from './add-address/add-address.component';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent,
    ShopComponent,
    NavBarComponent,
    CheckoutComponent,
    AddAddressComponent,
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    NgbModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserModule,
    MatMenuModule
  ]
})
export class HeaderModule { }
