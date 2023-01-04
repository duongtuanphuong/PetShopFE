import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items : any[] = [];


  subject = new Subject<any[]>();
  subject$ = this.subject.asObservable();

  constructor() {
   }

  getData(){
    return this.subject$;
  }

  saveCart():void{
    localStorage.setItem('cart_items',JSON.stringify(this.items));
  }

  addToCart(item: any){
    item.subTotal = item.quantity * item.price;
    this.items.push(item);
    this.subject.next(this.items);
    this.saveCart();
  }

  loadCart():void{
    this.subject.next(this.items);
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  productInCart(item: any):boolean{
    return this.items.findIndex((x:any) => x.id == item.id) > -1;
  }

  getItem() {
    this.subject.next(this.items);
    return this.items;
  }


  remove(item: any){
    const index = this.items.findIndex((o:any) => o.id == item.id);
    if(index > -1){
      this.items.splice(index,1);
      this.saveCart();
      this.subject.next(this.items);
    }
  }

  clearCart(){
    this.items = [];
    localStorage.removeItem('cart_items');
    this.subject.next(this.items);

  }





  
}
