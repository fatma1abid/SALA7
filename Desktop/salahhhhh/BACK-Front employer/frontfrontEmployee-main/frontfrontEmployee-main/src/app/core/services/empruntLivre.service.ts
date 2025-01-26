import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { empruntLivre } from '../models/empruntLivre.models';

@Injectable({
  providedIn: 'root'
})
export class EmpruntLivreService {

  constructor(private http : HttpClient){

  }

  private apiServerUrl = 'http://localhost:8080/emprunts';


  addEmpruntLivre(email : string , dateDebutEmprunt:Date , dateFinEmprunt:Date , idLivre:number):Observable<empruntLivre>{
     
    const formData: FormData = new FormData();
    formData.append('email', email );
    formData.append('dateDebutEmprunt', dateDebutEmprunt.toString() );
    formData.append('dateFinEmprunt', dateFinEmprunt.toString() );
    formData.append('idLivre', idLivre.toString() );

    return this.http.post<empruntLivre>(this.apiServerUrl + '/add', formData);
  }


  addEmpruntLivreAdmin(email : string , dateDebutEmprunt:Date , dateFinEmprunt:Date , idLivre:number):Observable<empruntLivre>{
     
    const formData: FormData = new FormData();
    formData.append('email', email );
    formData.append('dateDebutEmprunt', dateDebutEmprunt.toString() );
    formData.append('dateFinEmprunt', dateFinEmprunt.toString() );
    formData.append('idLivre', idLivre.toString() );

    return this.http.post<empruntLivre>(this.apiServerUrl + '/add/admin', formData);
  }



  getAllEmpruntLivre() : Observable<empruntLivre[]> {
      return this.http.get<empruntLivre[]>(this.apiServerUrl + '');
  }


  supprimerEmpruntLivre(id:any , idLivre:any)  {
    return this.http.delete(this.apiServerUrl + `/${id}/${idLivre}`);
  }


  getEmpruntLivre(id:any) : Observable<empruntLivre> {
    return this.http.get<empruntLivre>(this.apiServerUrl + `/${id}`);
  }



  getNbreEmpruntLivre() : Observable<number> {
    return this.http.get<number>(this.apiServerUrl + "/count/total");
  }


  getNbreEmpruntLivreEncours() : Observable<number> {
    return this.http.get<number>(this.apiServerUrl + "/count/Encours");
  }


  getNbreEmpruntLivreAccepte() : Observable<number> {
    return this.http.get<number>(this.apiServerUrl + "/count/Accepte");
  }



  modifierEmpruntLivre(id:any,  dateDebutEmprunt:Date , dateFinEmprunt:Date , idLivre:number , idAncienLivre:number  ) :Observable<empruntLivre> {

    const formData: FormData = new FormData();
    formData.append('dateDebutEmprunt', dateDebutEmprunt.toString() );
    formData.append('dateFinEmprunt', dateFinEmprunt.toString() );
    formData.append('idLivre', idLivre.toString() );
    formData.append('idAncienLivre', idAncienLivre.toString() );
      
    return this.http.put<empruntLivre>(this.apiServerUrl + `/${id}` , formData);
  }


  accepterDemandeEmprunt(id:any,email:string,idLivre:number):Observable<empruntLivre>{
    const formData: FormData = new FormData();
    formData.append('email', email.toString() );
    formData.append('idLivre', idLivre.toString() );

    return this.http.put<empruntLivre>(this.apiServerUrl + `/accepter/${id}`, formData) ;
  }


  
  refuserDemandeEmprunt(idEmprunt:any,idLivre:any, idEtudiant:any){
    return this.http.delete(this.apiServerUrl + `/refuser/${idEmprunt}/${idLivre}/${idEtudiant}` ) ;
  }


}
