import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Foyer } from "../Model/Foyer";
import { Observable } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders( {'Content-Type': 'application/json'} )
    };
@Injectable({
  providedIn: 'root'
})
export class FoyersServiceService {

  id!:number;
    showAllF= "http://localhost:8080/Foyer";
    AjouterF="http://localhost:8080/addFoyer";
    SupprimerF="http://localhost:8080/Foyer";
    UpdateF = "http://localhost:8080/Foyer/update";
    getFoyerById="http://localhost:8080/Foyer";
    getSumBlocByFoyer="/Foyer/getSumBloc";
    getFoyerParTypeSexe="http://localhost:8080/Foyer/getFoyerParTypeSexe";
    getFoyerParTypeMixte="http://localhost:8080/Foyer/getFoyerParTypeMixte";
 

 
    constructor(private http : HttpClient )
    {

    }
   showAllFoyer(): Observable <Foyer[]>
    {
       return this.http.get<Foyer[]>(this.showAllF);

    }
    showAllFoyerMixte(): Observable <Foyer[]>
    {
       return this.http.get<Foyer[]>(this.getFoyerParTypeMixte);

    }
    showAllFoyerParSexe(): Observable <Foyer[]>
    {
       return this.http.get<Foyer[]>(this. getFoyerParTypeSexe);

    }
    ajouterFoyer( prod: Foyer):Observable<Foyer>{
        return this.http.post<Foyer>(this.AjouterF, prod, httpOptions);
      }
      supprimerFoyer( id : number){
        const url = `${this.SupprimerF}/${id}`;
        return this.http.delete(url, httpOptions);
      
      }
      updateAdmins(p:Foyer): Observable<Foyer>
      {
      return this.http.put<Foyer>(this.UpdateF, p, httpOptions);
      }
      getById(id :number): Observable <Foyer[]>
      {
        const url = `${this.getFoyerById}/${id}`;
        return this.http.get<Foyer[]>(url);
      }
      FgetSumBlocByFoyer(idFoyer:number)
      {
       const url = `${this.getSumBlocByFoyer}/${idFoyer}`;
       return this.http.get(url);
      }
     
     
   
}
