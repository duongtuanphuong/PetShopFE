import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const CATEGORY_API = "http://localhost:8080/api/category/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getListCategory():Observable<any>{
    return this.http.get(CATEGORY_API,httpOptions);
  }

  getCategory(id: number):Observable<any>{
    return this.http.get(CATEGORY_API + id,httpOptions);
  }

  getListCategoryEnabled():Observable<any>{
    return this.http.get(CATEGORY_API + 'enabled',httpOptions);
  }

  createCategory(name: string):Observable<any>{
    return this.http.post(CATEGORY_API +'create',{name},httpOptions);
  }

  updateCategory(id: number,name : string):Observable<any>{
    return this.http.put(CATEGORY_API + 'update/'+ id,{name},httpOptions);
  }

  enableCategory(id: number):Observable<any>{
    return this.http.put(CATEGORY_API +'enabled/' + id,httpOptions);
  }

  deleteCategory(id: number):Observable<any>{
    return this.http.delete(CATEGORY_API + 'delete/' +id,httpOptions);
  }


}
