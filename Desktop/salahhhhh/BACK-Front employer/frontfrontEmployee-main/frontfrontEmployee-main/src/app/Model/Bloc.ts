import { Chambre } from "./Chambre";
import { Foyer } from "./Foyer";

export class Bloc
{   idBloc! : number;
    nomBloc!:String  ;
    capaciteBloc!: number ;
    foyer!:Foyer;
    chambres!:Set<Chambre>;
}