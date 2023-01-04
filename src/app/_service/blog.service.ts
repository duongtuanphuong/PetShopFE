import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BLOG_API = "http://localhost:8080/api/blog/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }


  getListPost():Observable<any>{
    return this.http.get(BLOG_API,httpOptions);
  }

  getNewestPost(id:number):Observable<any>{
    return this.http.get(BLOG_API + 'newest/' + id,httpOptions);
  }

  createPost(title: string, description: string,content: string,file: File):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file',file);
    formData.append('title',title);
    formData.append('description',description);
    formData.append('content',content);

    return this.http.post(BLOG_API + 'create',formData);
  }

}
