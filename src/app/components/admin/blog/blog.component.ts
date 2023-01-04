import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  listPost: any;
  displayForm : boolean = false;

  postForm: any ={
    title : null,
    description: null,
    content: null
  }

  selectedFile !: FileList;
  currentFile !: File;

  constructor(private blogService: BlogService){

  }

  ngOnInit(): void {
    this.getListPost();
  }


  getListPost(){
    this.blogService.getListPost().subscribe({
      next: res =>{
        this.listPost = res;
        console.log(this.listPost);
      },error: err =>{
        console.log(err);
      }
    })
  }


  chooseImage(event: any){
    this.selectedFile = event.target.files;
  }

  savePost(){
    const {title,description,content} = this.postForm;
    if(this.selectedFile){
      const file: File | null = this.selectedFile.item(0);
      if(file){
        this.currentFile = file;
        this.blogService.createPost(title,description,content,this.currentFile).subscribe({
          next: res =>{
            this.getListPost();
          },error: err=>{
            console.log(err);
          }
        })
      }
    }

  }

  showForm(){
    this.displayForm =true;
  }

}
