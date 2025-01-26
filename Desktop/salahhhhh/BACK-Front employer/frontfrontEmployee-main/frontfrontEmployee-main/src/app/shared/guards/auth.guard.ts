import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import * as jwt from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
    
    constructor( private router:Router,private jwtHelper:JwtHelperService) {}  
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token  = localStorage.getItem('Token') as string
        console.log(!this.jwtHelper.isTokenExpired(token));
        if(!this.jwtHelper.isTokenExpired(token) || token){  
            return true;
        }else{
            localStorage.removeItem('Token');
            this.router.navigate(['/front/login']);
            return false;
        }
    }
}