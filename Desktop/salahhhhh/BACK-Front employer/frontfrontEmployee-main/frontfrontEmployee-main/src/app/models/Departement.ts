import { Universite } from "./universite";

export class Departement {
    idDepartement!:number;
    nomDepartement!:string;
    responsable!:string;
    nombreProfesseurs!: number;
    specialite!:String;
    universite!: Universite
}