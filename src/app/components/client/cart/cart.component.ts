import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listItemInCart: any[] = [];
  totalPrice : number = 0;

  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.getListItemInCart();
    this.getTotalPrice();
  }


  getListItemInCart(){
    this.listItemInCart = this.cartService.items;
  }

  removeItem(item: any){
      this.cartService.remove(item);
      this.getListItemInCart();
      this.getTotalPrice();
  }

  getTotalPrice(){
    this.totalPrice = 0;
    this.cartService.items.forEach(res =>{
      this.totalPrice += res.subTotal;
    })
  }

  updateQuantity(item: any){
     const quantity = item.quantity;
     const price = item.price;
     item.subTotal = quantity * price;
     this.cartService.saveCart();
     this.getTotalPrice();
     this.cartService.getItem();
  }


}
