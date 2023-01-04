import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_service/blog.service';

@Component({
  selector: 'app-blog-client',
  templateUrl: './blog-client.component.html',
  styleUrls: ['./blog-client.component.css']
})
export class BlogClientComponent implements OnInit {

  listBlog : any;

  constructor(private blogService: BlogService){
    
  }

  ngOnInit(): void {
    this.getListBlog();
  }


  getListBlog(){
    this.blogService.getListPost().subscribe({
      next: res =>{
        this.listBlog = res;
      }
    })
  }

}
