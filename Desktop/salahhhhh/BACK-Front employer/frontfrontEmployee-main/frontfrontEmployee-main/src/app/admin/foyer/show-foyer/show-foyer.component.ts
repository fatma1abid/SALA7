import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';


@Component({
  selector: 'app-show-foyer',
  templateUrl: './show-foyer.component.html',
  styleUrls: ['./show-foyer.component.scss']
})
export class ShowFoyerComponent {
  listFoyer!: Foyer[];

  constructor(private service:FoyersServiceService,private route : Router )
  {

  }

  ngOnInit()
  {
    this.service.showAllFoyer().subscribe(result=>{
      this.listFoyer=result;
    });
    console.log(this.listFoyer)

  }
supprimer(k:Foyer)
{
 //this.route.navigate(["/admin/foyer/DeleteFoyer"]);

 let conf = confirm("Etes-vous sûr de Supprimer ce Foyer  ?");
 if (conf)
 this.service.supprimerFoyer(k.idFoyer).subscribe(() => {
 console.log("Foyer supprimé");
 this.SuprimerFoyerDuTableau(k);
 });
 }
 SuprimerFoyerDuTableau(prod : Foyer) {
   this.listFoyer.forEach((cur, index) => {
   if(prod.idFoyer=== cur.idFoyer) {
   this.listFoyer.splice(index, 1);
   }
   });
   }
modifier(id:number)
{
  this.route.navigate(["/admin/foyer/UpdateFoyer/"+id])
}
Consulter(a:number)
{
 
  this.route.navigate(["/admin/foyer/consulter/"+a])
  
}
Affecterdesbloc(b:String)
{

  this.route.navigate(["/admin/foyer/AffecterBloc/"+b])
}

}
