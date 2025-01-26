import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from '../Model/Bloc';
import { Foyer } from '../Model/Foyer';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class BlocsServiceService {

  AddBloc = "http://localhost:8080/addbloc";
  SupprimerBloc ="http://localhost:8080/bloc";
  UpdateBloc="http://localhost:8080/bloc/update";
  ShowBloc="http://localhost:8080/bloc";
  affecterChambresABloc="http://localhost:8080/bloc/affecterChambresABloc";
  affecterBlocAFoyer="http://localhost:8080/bloc/affecterBlocAFoyer";
  nbChambreParTypeEtBloc="http://localhost:8080"
  GetBlocById="http://localhost:8080/bloc";
  GetBlocByIdFoyer="http://localhost:8080/blocByIdFoyer"
  getBlocsNonAffecter="http://localhost:8080/getBlocsNonAffecter"
  AffecterBlocsAFoyer="http://localhost:8080/bloc/affecterBlocAFoyer";
  getBlocByNom="http://localhost:8080/getBlocByNom";
 
  

  constructor(private http:HttpClient)
   { }

   FshowBloc() : Observable<Bloc[]>
   {
      return this.http.get<Bloc[]>(this.ShowBloc);
   }
   FSupprimerBloc(id:number) : Observable<Bloc[]>
   {
    const url = `${this.SupprimerBloc}/${id}`;
    return this.http.delete<Bloc[]>(url,httpOptions);
   }
   FUpdateBloc(b:Bloc) : Observable<Bloc[]>
   {
    return this.http.put<Bloc[]>(this.UpdateBloc,b,httpOptions);

   }
   FAjouterBloc(b:Bloc) : Observable<Bloc[]>
   {
    return this.http.post<Bloc[]>(this.AddBloc,b,httpOptions);
   }
   FGetBlocById(id:number) : Observable<Bloc[]>
   {
    const url = `${this.GetBlocById}/${id}`;
    return this.http.get<Bloc[]>(url)
   }
   FgetListBlocByIdFoyer(id:number):Observable<Bloc[]>
   {
    const url = `${this.GetBlocByIdFoyer}/${id}`;
    return this.http.get<Bloc[]>(url)
   }
   FgetBlocNonAffecter():Observable<Bloc[]>
   {
    return this.http.get<Bloc[]>(this.getBlocsNonAffecter);
   }
   FaffecterBlocAFoyer(nomBloc:String,nomFoyer:String):Observable<Bloc[]>
   {
    const url = `${this.AffecterBlocsAFoyer}/${nomBloc}/${nomFoyer}`;
 return this.http.put<Bloc[]>(url,httpOptions);
   }
   FGetBlocByNom(nomBloc:String):Observable<Bloc[]>
   {
    const url = `${this.getBlocByNom}/${nomBloc}`;
    return this.http.get<Bloc[]>(url);
   }

 
}
