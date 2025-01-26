import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departement } from '../models/Departement';
import { Observable } from 'rxjs';
import { Universite } from '../models/universite';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl1 = 'http://localhost:8080/Departement';
  
  constructor( private http:HttpClient ) { }

    // Créer un département
    addDepartement(departement: Departement): Observable<Departement> {
    departement.idDepartement = Date.now();
      return this.http.post<Departement>(this.apiUrl1 + '/addDepartment',departement);
    }
  
    // Lire tous les départements
    getAllDepartements(): Observable<Departement[]> {
      return this.http.get<Departement[]>(this.apiUrl1 +'/getAllDepartments');
    }
  
    // Lire un département par ID
    getDepartementById(id: number): Observable<Departement> {
      return this.http.get<Departement>(this.apiUrl1 +`/getDepartementById/${id}`);
    }
  
    updateDepartement(id: number, departement: Departement): Observable<Departement> {
      // Create an object to hold the parameters
      const params: any = {
        nomDepartement: departement.nomDepartement,
        responsable: departement.responsable,
        nombreProfesseurs: departement.nombreProfesseurs.toString(),
        specialite: departement.specialite.toString(),
      };
    
      // Check if universite is defined before adding it to the parameters
      if (departement.universite) {
        params.universite = departement.universite.toString();
      }
    
      return this.http.put<Departement>(`${this.apiUrl1}/update/${id}`, {}, { params });
    }
    
    
    // Supprimer un département par ID
    deleteDepartement(id: number): Observable<void> {
      return this.http.delete<void>(this.apiUrl1 + `/deleteDepartment/${id}`);


    }

    getUniversites(): Observable<Universite[]> {
      return this.http.get<Universite[]>(`${this.apiUrl1}/getUniversites`);
    }

    affecterDepartementAUniversite(departementId: number, universiteId: number): Observable<Departement> {
      return this.http.put<Departement>(`${this.apiUrl1}/affecterDepartementAUniversite/${departementId}/${universiteId}`, {});
    }

    
    
  }