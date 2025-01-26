import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(public userService: UserService,
     public router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['expectedRole']
    if(this.userService.getRole()!==expectedRole){
      if(this.userService.getRole()=="ADMIN"){
        this.router.navigate(['/admin/acceuil']);
      }else if(this.userService.getRole()=="ETUDIANT"){
        this.router.navigate(['/front/universite/afficher']);

      }
      return false;
    }
    return true;

  }
  
}