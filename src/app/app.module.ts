import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginNavComponent } from './auth/login-nav/login-nav.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { PricebookComponent } from './home/pricebook/pricebook.component';
import {CommonModule} from "@angular/common";
import { PriceBookFilterPipe } from './Pipes/price-book-filter.pipe';
import { ProductComponent } from './home/product/product.component';
import { FixedChargeComponent } from './home/fixed-charge/fixed-charge.component';
import { ProductCrudComponent } from './home/product-crud/product-crud.component';
import { ProductPaginationPipe } from './Pipes/product-pagination.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BundleComponent } from './home/bundle/bundle.component';
import { BundleCrudComponent } from './home/bundle-crud/bundle-crud.component';
import { SubproductPaginationPipe } from './Pipes/subproduct-pagination.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginNavComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    HomeNavComponent,
    PricebookComponent,
    PriceBookFilterPipe,
    ProductComponent,
    FixedChargeComponent,
    ProductCrudComponent,
    ProductPaginationPipe,
    BundleComponent,
    BundleCrudComponent,
    SubproductPaginationPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
