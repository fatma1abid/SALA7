import { Chambre, } from "./chambre.model";
import { Utilisateur } from "./utilisateur.model";
import { DatePipe } from '@angular/common';
import { TypeChambre, } from "./TypeChambre.model";

export class Reservation   {
    idReservation?: number;
    anneeUniversitaire?: Date;
    estValide ?: Boolean;
    chambre ?:Chambre;
   
    constructor(idReservation: number, anneeUniversitaire: Date) {
      this.idReservation = idReservation;
      this.anneeUniversitaire = anneeUniversitaire;
    }
    
    //utilisateur?: Utilisateur[];
    

  }