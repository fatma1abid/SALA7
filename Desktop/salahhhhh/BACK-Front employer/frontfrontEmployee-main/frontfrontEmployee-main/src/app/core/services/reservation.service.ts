import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { Chambre } from '../models/chambre.model';
import { DatePipe } from '@angular/common';
import { TypeChambre } from '../models/TypeChambre.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiServerUrl =  'http://localhost:8080/api/reservation';
  
  private apiServerUr =  'http://localhost:8080/api/chambres';
   chambreUrl:string='http://localhost:8080/api/chambres/getAllChambre';
  constructor(private http: HttpClient){ } 

  /*addReservation(anneeUniversitaire: Date ,typeChambre:TypeChambre  ): Observable<Reservation> {
    
      const reservation: Reservation = { anneeUniversitaire ,typeChambre  };
      return this.http.post<Reservation>(`${this.apiServerUrl}/addReservation`, reservation);
        
  }*/
  
  addReservation(anneeUniversitaire: Date, _typeChambre: TypeChambre): Observable<Reservation> {
    const chambre = new Chambre( );
    const reservation: Reservation = { anneeUniversitaire, chambre }; // Use the 'chambre' property here

    return this.http.post<Reservation>(`${this.apiServerUrl}/addReservation`, reservation);
  }
  /*AddRes(reservation:Reservation):Observable<Reservation>
  {
   return this.http.post<Reservation>
    (this.apiServerUrl+"/addReservation",reservation);
  }
*/

  public getAllChambre(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiServerUr}/getAllChambre`);
  } 
/*
  public getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/getAllRes`);
  } */


  getAllReservation(){
    return this.http.get<Reservation[]> (`${this.apiServerUrl}/getAllRes`);
  }

  getChambre() : Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.chambreUrl);
  }


  supprimerReservation(idReservation:any)  {
    return this.http.delete(this.apiServerUrl + `/deleteRes/${idReservation}`);
  }

getReservation(idReservation:any) : Observable<Reservation> {
    return this.http.get<Reservation>(this.apiServerUrl + `/${idReservation}`);
  }


  modifierReservation(idReservation : number ,anneeUniversitaire : Date ): Observable<Reservation> {
    const reservation: Reservation = {idReservation, anneeUniversitaire  };  
    return this.http.put<Reservation>(this.apiServerUrl+`/updateRes`, reservation);
  }





  

















  /*public getReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/getAllRes`);
  }
  public addReservation(Reservation:Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiServerUrl} /addRes`,Reservation);
  }
  public updateReservation(Reservation:Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiServerUrl} /updateRes`,Reservation);
  }

  public deleteReservation(ReservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteRes/${ReservationId}`);
  }*/
   

}
function of(arg0: null): Observable<Reservation> {
  throw new Error('Function not implemented.');
}

