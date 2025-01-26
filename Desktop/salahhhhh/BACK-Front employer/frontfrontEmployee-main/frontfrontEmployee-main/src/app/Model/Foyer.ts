import { Bloc } from "./Bloc";
import { Universite } from "./Universite";

export class Foyer{
    idFoyer!:number;
    image!:String;
    description!:String;
    nomFoyer!:String;
    capaciteFoyer!:number;
    blocs!:Bloc[] ;
    universite!:Universite;
    Type!:String;
}