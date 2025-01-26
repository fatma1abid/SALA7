import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chambre } from '../models/chambre.model';
import { TypeChambre } from '../models/TypeChambre.model';
 

@Injectable({providedIn: 'root'})
export class ChambreService {

  private apiServerUrl =  'http://localhost:8080/api/chambres';

  constructor(private http: HttpClient){} 

  

  /*addChambre(numeroChambre : number , typeChambre:TypeChambre ):Observable<Chambre>{
    const formData: FormData = new FormData();
    formData.append('numeroChambre',numeroChambre.toString() );
    formData.append('typeChambre',typeChambre );
    return this.http.post<Chambre>(this.apiServerUrl + '/addChambre', formData);
  }*/

  addChambre(numeroChambre: number, typeChambre: TypeChambre): Observable<Chambre> {
    const chambre: Chambre = { numeroChambre, typeChambre };  
    return this.http.post<Chambre>(`${this.apiServerUrl}/addChambre`, chambre);
  }
  
  /*
  public addChambre(chambre:Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(`${this.apiServerUrl}api/chambres/addChambre`,chambre);
  }*/

   public getAllChambre(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiServerUrl}/getAllChambre`);
  } 
   
  getchambreListe="http://localhost:8005/getChambreByIDBloc";
  FshowChambre(idBloc:number) : Observable<Chambre[]>
  {
   const url = `${this.getchambreListe}/${idBloc}`;
     return this.http.get<Chambre[]>(url);
  }
   
  supprimerChambre(idChambre:any)  {
    return this.http.delete(this.apiServerUrl + `/deleteChambre/${idChambre}`);
  }
  
  getChambre(idChambre:any) : Observable<Chambre> {
    return this.http.get<Chambre>(this.apiServerUrl + `/${idChambre}`);
  }

  /*modifierChambre(  idChambre : number ,numeroChambre : number , typeChambre:TypeChambre ) :Observable<Chambre> {
     
    const formData: FormData = new FormData();
    formData.append('idChambre', idChambre.toString());
    formData.append('numeroChambre', numeroChambre.toString());
    formData.append('typeChambre', typeChambre.toString());
    return this.http.put<Chambre>(this.apiServerUrl + `/updateChambre` , formData);
  }*/

  modifierChambre(idChambre : number ,numeroChambre: number, typeChambre: TypeChambre): Observable<Chambre> {
    const chambre: Chambre = {idChambre, numeroChambre, typeChambre };  
    return this.http.put<Chambre>(this.apiServerUrl+`/updateChambre`, chambre);
  }


  
}