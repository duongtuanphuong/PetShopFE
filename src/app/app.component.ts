import { Component, OnInit } from '@angular/core';
import { AuthService } from './_service/auth.service';
import { StorageService } from './_service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private authService: AuthService, private storage: StorageService){
    this.isLoggedIn = this.storage.isLoggedIn();
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      const user = this.storage.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  ngOnInit(): void {
  }
  title = 'PetShop';
}
