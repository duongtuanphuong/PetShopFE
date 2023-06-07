import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/client/home/home.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductComponent } from './components/admin/product/product.component';
import { BlogComponent } from './components/admin/blog/blog.component';
import { OrderComponent } from './components/admin/order/order.component';
import { AccountComponent } from './components/admin/account/account.component';
import { ContactComponent } from './components/admin/contact/contact.component';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import { CategoryComponent } from './components/admin/category/category.component';
import {MenubarModule} from 'primeng/menubar';
import { ProfileComponent } from './components/admin/profile/profile.component';
import {DividerModule} from 'primeng/divider';
import {FileUploadModule} from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {PanelModule} from 'primeng/panel';
import { IndexComponent } from './components/client/index/index.component';
import {CarouselModule} from 'primeng/carousel';
import {AnimateModule} from 'primeng/animate';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { SuccessComponent } from './components/client/success/success.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { CategoryClientComponent } from './components/client/category-client/category-client.component';
import {DataViewModule} from 'primeng/dataview';
import { BlogClientComponent } from './components/client/blog-client/blog-client.component';
import { UserDetailComponent } from './components/client/user-detail/user-detail.component';
import { OrderDetailComponent } from './components/client/order-detail/order-detail.component';
import { AdminGuardService } from './_service/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ProductComponent,
    BlogComponent,
    OrderComponent,
    AccountComponent,
    ContactComponent,
    CategoryComponent,
    ProfileComponent,
    IndexComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent,
    ProductDetailComponent,
    CategoryClientComponent,
    BlogClientComponent,
    UserDetailComponent,
    OrderDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    TabViewModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ToastModule,
    OverlayPanelModule,
    BadgeModule,
    AvatarModule,
    MenubarModule,
    DividerModule,
    FileUploadModule,
    CardModule,
    TableModule,
    RadioButtonModule,
    InputTextareaModule,
    InputNumberModule,
    PanelModule,
    CarouselModule,
    AnimateModule,
    DataViewModule
  ],
  providers: [AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
