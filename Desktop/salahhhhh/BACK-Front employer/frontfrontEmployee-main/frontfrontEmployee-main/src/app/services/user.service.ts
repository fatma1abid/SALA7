import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type': 'application/json'})}
  url ="http://localhost:8080/"
  constructor(private httpClient: HttpClient,
    private jwtHelper:JwtHelperService) {


  }
  getUserByEmprunt(id:any) : Observable<any> {
    return this.httpClient.get<any>(`${this.url}utilisateurs/emprunt/${id}`);
  }
  getUsers():Observable<any[]>{
    return this.httpClient.get<any[]>(this.url+"utilisateurs")
  }
  getEtudiantNonArchive(role:string,etat:string):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.url}utilisateurs/getByRoleEtat?role=${role}&etat=${etat}`)
  }
  register(data:any):Observable<any>{
    return this.httpClient.post<any>(this.url+"utilisateurs/register",data)
  }
  login(data:any):Observable<any>{
    return this.httpClient.post<any>(this.url+"utilisateurs/login",data,this.httpOptions)
  }
    logout():Observable<any>{
    return this.httpClient.put<any>(this.url+"utilisateurs/logout",{})

  }
  getUser(id:any):Observable<any>{
    return this.httpClient.get<any>(`${this.url}utilisateurs/get/${id}`,this.httpOptions);
  }
  getUserByEmail(email:any):Observable<any>{
    return this.httpClient.get<any>(`${this.url}utilisateurs/getByEmail?email=${email}`);
  }
  confirmAccount(token: string): Observable<any> {
     return this.httpClient.get(`${this.url}utilisateurs/confirm?token=${token}`, { responseType: 'text' });
  }
  updateUser(id:any,data:any):Observable<any>{
    return this.httpClient.put<any>(`${this.url}utilisateurs/edit/${id}`,data);
  }
  changerEtat(id:any,etat:any):Observable<any>{
    return this.httpClient.put<any>(`${this.url}utilisateurs/etat/${id}`,etat);
  }

  getUserEmail():string{
    const token = localStorage.getItem('Token')as string
    const tokenPayload : any= jwt.jwtDecode(token) 


         return tokenPayload.sub
   }
   getRole():string{
    const token = localStorage.getItem('Token')as string
    const tokenPayload :any = jwt.jwtDecode(token)
         console.log(tokenPayload.roles[0].authority)
          return tokenPayload.roles[0].authority
   }
   isAUthenticated():boolean{
    const token  = localStorage.getItem('Token') as string
    return !this.jwtHelper.isTokenExpired(token)
   }
}
