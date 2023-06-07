import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  roles: string[] =[];

  constructor(private storageService: StorageService,private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.roles = this.storageService.getUser().roles;

    if(this.roles.includes("ROLE_ADMIN")){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
