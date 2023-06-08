import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home/home.component";
import {PricebookComponent} from "./home/pricebook/pricebook.component";
import {ProductComponent} from "./home/product/product.component";
import {ProductCrudComponent} from "./home/product-crud/product-crud.component";
import {BundleCrudComponent} from "./home/bundle-crud/bundle-crud.component";
import {BundleComponent} from "./home/bundle/bundle.component";
const routes: Routes = [
  {path:'', redirectTo:'', pathMatch :'full'},
  {path:'signUp', component: SignUpComponent},
  {path:'logIn', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'pricebook', component: PricebookComponent},
  {path:'products', component: ProductComponent},
  {path:'products/:operation/:productId', component: ProductCrudComponent},
  {path:'bundles', component: BundleComponent},
  {path:'bundles/:operation/:productId', component: BundleCrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
