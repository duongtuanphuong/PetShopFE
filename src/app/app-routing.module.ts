import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/admin/account/account.component';
import { BlogComponent } from './components/admin/blog/blog.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { ContactComponent } from './components/admin/contact/contact.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { OrderComponent } from './components/admin/order/order.component';
import { ProductComponent } from './components/admin/product/product.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { BlogClientComponent } from './components/client/blog-client/blog-client.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CategoryClientComponent } from './components/client/category-client/category-client.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { HomeComponent } from './components/client/home/home.component';
import { IndexComponent } from './components/client/index/index.component';
import { OrderDetailComponent } from './components/client/order-detail/order-detail.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { SuccessComponent } from './components/client/success/success.component';
import { UserDetailComponent } from './components/client/user-detail/user-detail.component';

const routes: Routes = [
  {
    path:'',component: HomeComponent,
    children: [
      {path:'',component:IndexComponent},
      {path:'cart',component: CartComponent},
      {path:'checkout',component: CheckoutComponent},
      {path:'success', component: SuccessComponent},
      {path:'product/:id',component: ProductDetailComponent},
      {path:'category/:id',component: CategoryClientComponent},
      {path:'blog',component: BlogClientComponent},
      {path:'user-detail/:id',component:UserDetailComponent},
      {path:'order-detail/:id',component:OrderDetailComponent}
    ]
  },
  {path:'admin',component: DashboardComponent,
    children:[
      {path:'category',component:CategoryComponent},
      {path: 'product',component: ProductComponent},
      {path: 'blog',component: BlogComponent},
      {path: 'order',component: OrderComponent},
      {path: 'account',component: AccountComponent},
      {path: 'contact',component: ContactComponent},
      {path: 'profile',component:ProfileComponent}
    ] 
  },

  {path: '**',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
