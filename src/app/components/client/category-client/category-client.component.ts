import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-category-client',
  templateUrl: './category-client.component.html',
  styleUrls: ['./category-client.component.css'],
  providers: [MessageService]

})
export class CategoryClientComponent implements OnInit {
  
  id:any;

  listProduct : any;

  listNewestProduct: any;

  listItemInCart : any;
  constructor(private productService: ProductService,private route:ActivatedRoute,private router: Router,private cartService: CartService,private messageService: MessageService){
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
      this.showSuccess("Thêm vào giỏ hàng thành công")   
    }else{
      this.showWarn("Sản phẩm đã có trong giỏ hàng")
    }
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
