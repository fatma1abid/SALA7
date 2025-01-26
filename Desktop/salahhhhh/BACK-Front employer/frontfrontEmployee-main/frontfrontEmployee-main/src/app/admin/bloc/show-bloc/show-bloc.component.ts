import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { BlocsServiceService } from 'src/app/Service/blocs-service.service';
import { UpdateBlocComponent } from '../update-bloc/update-bloc.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-bloc',
  templateUrl: './show-bloc.component.html',
  styleUrls: ['./show-bloc.component.scss']
})
export class ShowBlocComponent {

  ListBloc !: Bloc[]
  m!:number
  constructor(private service: BlocsServiceService,private route : Router,private router:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.m=this.router.snapshot.params['idFoyer']
    
    this.service.FgetListBlocByIdFoyer(this.m).subscribe((result)=>{
      
      this.ListBloc=result;
    })
  
  
  }
  Consulter()
  {

  }
  modifier(a:number)
  {
    this.route.navigate(["/admin/bloc/UpdateBloc/"+a])
  }
 
  

  supprimer(a:Bloc)
  {

let conf = confirm("Etes-vous sûr de Supprimer ce Bloc  ?");
 if (conf)
 this.service.FSupprimerBloc(a.idBloc).subscribe(() => {
 console.log("Foyer supprimé");
 this.SuprimerFoyerDuTableau(a);
 });
 }
 SuprimerFoyerDuTableau(prod : Bloc) {
   this.ListBloc.forEach((cur, index) => {
   if(prod.idBloc=== cur.idBloc) {
   this.ListBloc.splice(index, 1);
   }
   });
   }

}
