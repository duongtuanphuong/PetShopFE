import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


    constructor(private productService: ProductService,private cartService: CartService){

    }

    ngOnInit(): void {
      this.getListProductByCategory();
      this.loadCart();
    }


    listItemInCart !: any;

    listProduct1: any;
    listProduct2: any;

    cars: any = [
        {
          url: 'assets/banner3.jpg'
        },
        {
          url: 'assets/banner2.jpg'
        },
        {
          url: 'assets/banner.jpg'
        },
        {
          url: 'assets/banner4.jpg'
        }
    ]


    getListProductByCategory(){
      this.productService.getProductByCategory(1,0).subscribe({
        next: res=>{
          this.listProduct1 = res;
        },error: err =>{
          console.log(err);
        }
      })
    }

    addTocart(item: any){
      if(!this.cartService.productInCart(item)){
        item.quantity = 1;
        this.cartService.addToCart(item);
        this.listItemInCart = this.cartService.getItem();          
      }
    }

    loadCart(){
      this.cartService.loadCart();
      this.listItemInCart = this.cartService.getItem();
    }

    // removeFormCart(item: any){
    //   this.cartService.remove(item);
    //   this.listItemInCart = this.cartService.getItem();
    // }



    

    // updateQuantity(item: any){
    //   const qty = item.quantity;
    //   const amt = item.price;
    //   item.subTotal = qty * amt;
    //   this.cartService.saveCart();
    // }
    


}
