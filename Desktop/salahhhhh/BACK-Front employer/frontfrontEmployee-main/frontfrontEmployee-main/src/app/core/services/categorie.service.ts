import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http : HttpClient){

  }

  private apiServerUrl = 'http://localhost:8080/categories';


  addCategorie(nom : string , description:string , image:File):Observable<Categorie>{

    const formData: FormData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('image', image, image.name);


    return this.http.post<Categorie>(this.apiServerUrl + '/add', formData);
  }



  getAllCategorie() : Observable<Categorie[]> {
      return this.http.get<Categorie[]>(this.apiServerUrl + '');
  }


  supprimerCategorie(id:any)  {
    return this.http.delete(this.apiServerUrl + `/${id}`);
  }


  getCategorie(id:any) : Observable<Categorie> {
    return this.http.get<Categorie>(this.apiServerUrl + `/${id}`);
  }


  getCategorieDuLivre(id:any) : Observable<Categorie> {
    return this.http.get<Categorie>(this.apiServerUrl + `/livre/${id}`);
  }


  modifierCategorie(id:any ,nom : string , description:string , image:File ) :Observable<Categorie> {

    const formData: FormData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('image', image, image.name);


    return this.http.put<Categorie>(this.apiServerUrl + `/${id}` , formData);
  }


}
