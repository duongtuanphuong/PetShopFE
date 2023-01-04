import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';
import {MessageService} from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { CategoryService } from 'src/app/_service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]

})
export class HomeComponent implements OnInit {

  authModal !: boolean;
  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  listItemInCart: any[] = [];
  listCategoryEnabled : any;
  totalPrice : number = 0;

  constructor(private authService: AuthService, private storage: StorageService,private messageService:MessageService,private cartService: CartService,private categoryService:CategoryService,private router: Router){
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storage.isLoggedIn();
    this.getListCategoryEnabled();
    this.cartService.loadCart();
    this.cartService.getData().subscribe(res =>{
      this.listItemInCart = res;
      this.getTotalPrice();
    })
  }


  showAuthModal(){
    if(!this.isLoggedIn){
      this.authModal = true;
      this.loginForm = {username: null,password: null};
      this.registerForm = {username: null,email: null, password: null};
    }
  }


  login():void{
    const {username,password} = this.loginForm;
    this.authService.login(username,password).subscribe({
      next: res =>{
        this.storage.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storage.getUser().roles;
        this.showSuccess("Đăng nhập thành công!!");
        this.authModal = false;
        
      },error: err =>{
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        this.showError(err.message);
      }
    })
  }

  register():void{
    const {username,email,password} = this.registerForm;
    console.log(this.registerForm);
    this.authService.register(username,email,password).subscribe({
      next: res =>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccess("Đăng ký thành công")
        this.authModal = false;
      },error: err =>{
        this.showError(err.message);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  logout():void{
    this.authService.logout().subscribe({
      next:res =>{
        this.storage.clean();
        this.isLoggedIn = false;
        this.authModal = false;
        this.showSuccess("Bạn đã đăng xuất!!");
      },error: err=>{
        this.showError(err.message);
      }
    })
  }

  removeFormCart(item: any){
    this.cartService.remove(item);
    this.listItemInCart = this.cartService.getItem();
    this.getTotalPrice();
  }

  loadCart(){
    this.cartService.loadCart();
    // this.listItemInCart = this.cartService.getItem();
  }


  updateQuantity(item: any){
    const qty = item.quantity;
    const amt = item.price;
    item.subTotal = qty * amt;
    this.cartService.saveCart();
  }

  getTotalPrice(){
    this.totalPrice = 0;
    this.cartService.items.forEach(res =>{
      this.totalPrice += res.subTotal;
    })
  }

  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategoryEnabled =res;
      },error: err=>{
        this.showError(err.message);
      }
    })
  }


  toProfile(){
    let id = this.storage.getUser().id;
    this.router.navigate(['user-detail',id]);
  }
  toOrderDetail(){
    let id = this.storage.getUser().id;
    this.router.navigate(['order-detail',id]);
  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
