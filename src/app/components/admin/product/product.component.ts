import { Component, OnInit } from '@angular/core';
import { Data, TitleStrategy } from '@angular/router';
import { CategoryService } from 'src/app/_service/category.service';
import { ImageService } from 'src/app/_service/image.service';
import { ProductService } from 'src/app/_service/product.service';
import { StorageService } from 'src/app/_service/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService]

})
export class ProductComponent implements OnInit {
  listProduct : any;
  listCategory : any;
  listImage : any;
  imageChoosen : any;
  listImageChoosen : any = [];
  disabled : boolean = true;
  selectedFiles ?: FileList;
  currentFile ?: File;
  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;
  user : any;



  productForm: any ={
    name : null,
    description : null,
    content: null,
    price: null,
    quantity: null,
    category: null,
    image: []
  };

  constructor(private productService: ProductService,private imageService: ImageService,private storageService:StorageService,private categoryService: CategoryService,private messageService: MessageService){}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.getListProduct();
    this.getListCategoryEnabled();
    this.getListImage();
  }

  onCreate(){
    this.showForm = true;
    this.listImageChoosen = [];
    this.onUpdate = false;
    this.productForm ={
      id:null,
      name: null,
      description : null,
      content : null,
      price: null,
      quantity: null,
      category: null,
      image: []
    }
  }

  onDelete(id: number,name : string){
    this.productForm.id = null;
    this.productForm.name = null;
    this.showDelete = true;
    this.productForm.id = id;
    this.productForm.name = name;
  }

  onChooseImage(){
    this.showImage =true;
    this.disabled = true;
    let data = document.querySelectorAll('.list-image img');
      data.forEach(i =>{
        i.classList.remove('choosen');
    })  
  }


  selectImage(event : any,res: any){
      let data = document.querySelectorAll('.list-image img');
      data.forEach(i =>{
        i.classList.remove('choosen');
      })
      event.target.classList.toggle("choosen");
      this.imageChoosen = res;
      this.disabled = false;      
  }
  
  chooseImage(){
    this.listImageChoosen.push(this.imageChoosen);
    this.showImage = false;
  }

  removeImage(data:any){    
    this.listImageChoosen.forEach((res: any) => {
        if(res == data){
          this.listImageChoosen.splice(res,1);
        }
    });
  }

  uploadFile(event: any){
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      if(file){
        this.currentFile = file;
        this.imageService.upload(this.currentFile).subscribe({
          next: res =>{
            this.currentFile = undefined;
            this.getListImage();
            this.showSuccess("Tải ảnh lên thành công");
          },error: err=>{
            this.showError(err.message);
          }
        })
      }
      this.currentFile = undefined;
    }
  }



  
  getListProduct(){
    this.productService.getListProduct().subscribe({
      next: res =>{
        this.listProduct = res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategory = res;
      },error : err=>{
        console.log(err);
      }
    })
  }

  getListImage(){
    this.imageService.getList().subscribe({
      next:res=>{
        this.listImage =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  createProduct(){
    let data = this.listImageChoosen;
    data.forEach((res: any)=>{
      this.productForm.image.push(res.id);
    })
    const {name,description,content,price,quantity,category,image} = this.productForm;
    console.log(this.productForm);
    this.productService.createProduct(name,description,content,price,quantity,category,image).subscribe({
      next: res =>{
        this.getListProduct();
        this.showForm = false;
        this.showSuccess("Tạo mới thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  enableProduct(id: number){
    this.productService.enableProduct(id).subscribe({
      next: res =>{
        this.getListProduct();
        this.showSuccess("Cập nhật thành công")
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  showUpdateForm(data : any){
    this.listImageChoosen = [];
      this.onUpdate = true;
      this.showForm =true;
      this.productForm.id = data.id;
      this.productForm.name = data.name;
      this.productForm.description = data.description;
      this.productForm.content = data.content;
      this.productForm.price = data.price;
      this.productForm.quantity = data.quantity;
      this.productForm.category = data.category.id;
      data.images.forEach((res : any) =>{
        this.listImageChoosen.push(res);
      })
      // console.log(this.listImageChoosen);
  }

  updateProduct(){
    let data = this.listImageChoosen;
    data.forEach((res: any)=>{
      this.productForm.image.push(res.id);
    })
    const {id,name,description,content,price,quantity,category,image} = this.productForm;
    this.productService.updateProduct(id,name,description,content,price,quantity,category,image).subscribe({
      next: res =>{
        this.getListProduct();
        this.showForm = false;
        this.showSuccess("Cập nhật thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })

  }

  deleteProduct(){

    this.productService.deleteProduct(this.productForm.id).subscribe({
      next: res =>{
        this.getListProduct();
        this.showWarn("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
