import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ORDER_API = "http://localhost:8080/api/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }

  getListOrderDetail(id: number):Observable<any>{
    return this.http.get(ORDER_API+ 'orderDetail/' + id,httpOptions);
  }

  getListOrderByUser(id: number):Observable<any>{
    return this.http.get(ORDER_API+ 'user/' +id,httpOptions);
  }

  createOrder(firstname: string,lastname: string,email:string,address: string, phone: string, note: string,orderDetails: any[],username: string):Observable<any>{
    return this.http.post(ORDER_API + 'create',{firstname,lastname,email,address,phone,note,orderDetails,username},httpOptions)
  }

}
