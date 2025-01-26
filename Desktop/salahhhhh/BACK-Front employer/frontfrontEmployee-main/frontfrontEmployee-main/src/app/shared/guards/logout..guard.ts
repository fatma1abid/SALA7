import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as jwt from 'jwt-decode';
import { UserService } from "src/app/services/user.service";


@Injectable({
    providedIn: 'root'
})

export class LogoutGuard {
    
    constructor( private router:Router,private jwtHelper:JwtHelperService,private userService:UserService) {}  
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('Token');
        if(this.jwtHelper.isTokenExpired(token) || !token){
            localStorage.removeItem('Token');

            return true;
        }else{
            if(this.userService.getRole() =="ETUDIANT"){
                this.router.navigateByUrl('/front/universite/afficher');
            }else{
                this.router.navigateByUrl('/admin/acceuil');
            }
            return false;
        }
    }
}