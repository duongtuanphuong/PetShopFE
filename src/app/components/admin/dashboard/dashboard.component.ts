import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {



  constructor(private authService: AuthService,private storage:StorageService,private messageService: MessageService,private router: Router){}

  ngOnInit(): void {

  }

  logout():void{
    this.authService.logout().subscribe({
      next:res =>{
        console.log(res);
        this.storage.clean();
        this.showSuccess("Bạn đã đăng xuất!!");
        this.router.navigate(['/']);
      },error: err=>{
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

}
