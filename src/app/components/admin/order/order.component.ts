import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listOrder: any;

  listOrderDetail: any;

  showOrder: boolean = false;

  constructor(private orderService: OrderService){

  }

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder(){
    this.orderService.getListOrder().subscribe({
      next: res =>{
        this.listOrder = res;
      },error: err=>{
        console.log(err);
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
