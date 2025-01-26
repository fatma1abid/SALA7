import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Universite } from '../models/universite';
import { Observable, catchError, throwError } from 'rxjs';
import { Departement } from '../models/Departement';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  private apiUrl1 = 'http://localhost:8080/Universite';


  constructor(private http: HttpClient) {}

  
  // Ajout d'une université
  addUniversite(universite: Universite): Observable<Universite> {
    universite.idUniversite = Date.now();
    return this.http.post<Universite>(this.apiUrl1 +'/add', universite);
  }
  

  public findAllUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl1 +'/All'}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching universities:', error);
          return throwError(error); // Re-throw the error after logging
        })
      );
  }
  

  updateUniversite(id: number, universite: Universite): Observable<Universite> {
    const params = new HttpParams()
      .set('nomUniversite', universite.nomUniversite.toString())
      .set('adresse', universite.adresse.toString())
      .set('etatUniversite', universite.etatUniversite.toString());
  
    return this.http.put<Universite>(`${this.apiUrl1}/update/${id}`, {}, { params });
  }
  
  
  getUniversiteById(id: number): Observable<Universite> {
    return this.http.get<Universite>(this.apiUrl1 +`/getUniversiteById/${id}`);

  }
  
  deleteUniversite(id: number): Observable<void> {
   
    return this.http.delete<void>(this.apiUrl1 + `/delete/${id}`);

  }

  
  affecterDepartementAUniversite(departementId: number, universiteId: number): Observable<any> {
    const url = `${this.apiUrl1}/affecterDepartementAUniversite/${departementId}/${universiteId}`;
    return this.http.put(url, {});
}

getDepartementsByNomUniversite(nomUniversite: string): Observable<Departement[]> {
  const url = `${this.apiUrl1}/getDepartementsByNomUniversite/${nomUniversite}`;
  return this.http.get<Departement[]>(url);
}
  
}