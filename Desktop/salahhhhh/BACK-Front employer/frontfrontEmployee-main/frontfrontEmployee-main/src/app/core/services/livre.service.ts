import { Injectable } from '@angular/core';
import { Livre } from '../models/livre.model';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn:'root'
})
export class LivreService {

  constructor(private http : HttpClient){

  }

  private apiServerUrl = 'http://localhost:8080/livres';


  addLivre(titre : string, description:string,nomAuteur:string,nbPages:number,dateDePublication:Date,categorie:number,image:File):Observable<Livre>{

    const formData: FormData = new FormData();
    formData.append('titre', titre );
    formData.append('description', description );
    formData.append('nomAuteur', nomAuteur );
    formData.append('nbPages', nbPages.toString() );
    formData.append('dateDePublication', dateDePublication.toString() );
    formData.append('idCategorie', categorie.toString() );
    formData.append('image', image, image.name);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');


    return this.http.post<Livre>(this.apiServerUrl + '/add', formData,{headers});
  }



  getAllLivres() : Observable<Livre[]> {
      return this.http.get<Livre[]>(this.apiServerUrl + '');
  }



  getAllLivresByCategory(idCategory:any) : Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiServerUrl + `/category/${idCategory}`);
  }

  
  getLivre(id:any) : Observable<Livre> {
    return this.http.get<Livre>(this.apiServerUrl + `/${id}`);
  }


  getLivreWithMaxEmprunts() : Observable<Livre> {
    return this.http.get<Livre>(this.apiServerUrl + "/maxEmprunts");
  }



  supprimerLivre(id:any)  {
    return this.http.delete(this.apiServerUrl + `/${id}`);
  }


  modifierLivre(id:any, titre : string, description:string,nomAuteur:string,nbPages:number,dateDePublication:string,idCategorie:number,disponibilite:number,image:File):Observable<Livre>  {

    const formData: FormData = new FormData();
    formData.append('titre', titre );
    formData.append('description', description );
    formData.append('nomAuteur', nomAuteur );
    formData.append('nbPages', nbPages.toString() );
    formData.append('dateDePublication', dateDePublication );
    formData.append('idCategorie', idCategorie.toString() );
    formData.append('disponibilite', disponibilite.toString() );
    formData.append('image', image, image.name);


    return this.http.put<Livre>(this.apiServerUrl + `/${id}` , formData );
  }

    
  getLivreByEmprunt(id:any) : Observable<Livre> {
    return this.http.get<Livre>(this.apiServerUrl + `/emprunt/${id}`);
  }


}
