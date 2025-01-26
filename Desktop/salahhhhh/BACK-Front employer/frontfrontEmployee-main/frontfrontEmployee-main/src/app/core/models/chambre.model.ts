import {TypeChambre} from "./TypeChambre.model";
import { Reservation } from "./reservation.model";

export class Chambre {
  static getChambreId() {
    throw new Error('Method not implemented.');
  }
    idChambre ?: number;
    numeroChambre!: number;
    typeChambre!: TypeChambre;
   // bloc?: Bloc[]; 
    reservations?:  Reservation[];
    

     
    
}

