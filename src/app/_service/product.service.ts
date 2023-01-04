import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PRODUCT_API = "http://localhost:8080/api/product/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getListProduct():Observable<any>{
    return this.http.get(PRODUCT_API,httpOptions);
  }

  getProdct(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + id,httpOptions);
  }

  getProductByCategory(id:number,productId: number):Observable<any>{
    return this.http.get(PRODUCT_API+ 'category/' + id +'/' + productId,httpOptions);
  }

  getListProductByCategory(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + 'category/'+id,httpOptions);
  }

  getNewestProduct(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + 'newest/' +id,httpOptions);
  }


  createProduct(name:string,description: string,content: string,price: string,quantity:number,category: number,image: Array<string>):Observable<any>{
    return this.http.post(PRODUCT_API +'create',{name,description,content,price,quantity,category,image},httpOptions);
  }

  updateProduct(id:number,name:string,description: string,content: string,price: string,quantity:number,category: number,image: Array<string>):Observable<any>{
    return  this.http.put(PRODUCT_API + 'update/' +id,{name,description,content,price,quantity,category,image});
  }

  enableProduct(id : number):Observable<any>{
    return this.http.put(PRODUCT_API + 'enabled/' + id,httpOptions);
  }

  deleteProduct(id : number):Observable<any>{
    return this.http.delete(PRODUCT_API + 'delete/' + id,httpOptions);
  }


}
