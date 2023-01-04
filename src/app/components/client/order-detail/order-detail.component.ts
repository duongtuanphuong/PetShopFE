import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/_service/order.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {


  listOrder : any;
  listOrderDetail: any;
  isLoggedIn = false;
  id: any;
  showOrder: boolean = false;

  constructor(private orderService: OrderService,private storageService: StorageService,private route: ActivatedRoute){

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.getListOrder();

  }

  getListOrder(){
    this.orderService.getListOrderByUser(this.id).subscribe({
      next:res =>{
        this.listOrder = res;
        console.log(res);
      },error: res =>{
        console.log(res);
      }
    })
  }

  getListOrderDetail(id: number){
    this.showOrder = true;
    this.orderService.getListOrderDetail(id).subscribe({
      next: res =>{
        this.listOrderDetail =res;
        console.log(this.listOrderDetail)
      },error : err =>{
        console.log(err);
      }
    })
  }

}
