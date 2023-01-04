import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-category-client',
  templateUrl: './category-client.component.html',
  styleUrls: ['./category-client.component.css']
})
export class CategoryClientComponent implements OnInit {
  
  id:any;

  listProduct : any;

  listNewestProduct: any;

  listItemInCart : any;
  constructor(private productService: ProductService,private route:ActivatedRoute,private router: Router,private cartService: CartService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
       this.id = params['id'];
    })
    this.cartService.loadCart();
    this.getListProductByCategory();
    this.getListNewestProduct();
  }



  getListProductByCategory(){
    this.productService.getListProductByCategory(this.id).subscribe({
      next: res =>{
        this.listProduct = res;
      },error: err=>{
        console.log(err);
      }
    });
  }

  getListNewestProduct(){
    this.productService.getNewestProduct(this.id).subscribe({
      next: res =>{
        this.listNewestProduct = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  seeProductDetail(id: number){
    this.router.navigate(['/product',id]);
  }

  addTocart(item: any){
    if(!this.cartService.productInCart(item)){
      item.quantity = 1;
      this.cartService.addToCart(item);
      this.listItemInCart = this.cartService.getItem();        
    }
  }

}
