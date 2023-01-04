import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit{

  listItemInCart: any[] = [];
  totalPrice : number = 0;
  isLoggedIn = false;
  username : any;

  listOrderDetails : Array<any> = [];
  orderForm : any ={
    firstname : null,
    lastname : null,
    email: null,
    address: null,
    phone: null,
    note:null,
    orderDetails: [],
    username: null
  };


  constructor(private cartService: CartService,private orderService:OrderService,private router: Router,private storageService: StorageService,private messageService:MessageService){

  }
  
  ngOnInit(): void {
    this.cartService.loadCart();
    this.getListItemInCart();
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      this.username =this.storageService.getUser().username;
      console.log(this.username);
    }
  }

  getListItemInCart(){
    this.listItemInCart = this.cartService.getItem();
    this.getTotalPrice();
  }

  getTotalPrice(){
    this.totalPrice = 0;
    this.cartService.items.forEach(res =>{
      this.totalPrice += res.subTotal;
    })
  }


  createOrder(){
    this.listItemInCart.forEach(res =>{
      let orderDetail: any ={
        name: null,
        price: null,
        qty: null,
     };
     orderDetail.name = res.name;
     orderDetail.price = res.price;
     orderDetail.qty = res.quantity;
     this.orderForm.orderDetails.push(orderDetail);
    })
    this.orderForm.username = this.username;
    const {firstname,lastname,email,address,phone,note,orderDetails,username} = this.orderForm;
    if(this.username != null){
      this.orderService.createOrder(firstname,lastname,email,address,phone,note,orderDetails,username).subscribe({
        next: res =>{
          this.cartService.clearCart();
          this.getListItemInCart();
          this.getTotalPrice();
          this.showSuccess("Bạn đã đặt hàng thành công");
          this.router.navigate(['/success'])
        }
      })
    } else{
      this.showError("Bạn chưa đăng nhập")
    }
  }


  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }
}


