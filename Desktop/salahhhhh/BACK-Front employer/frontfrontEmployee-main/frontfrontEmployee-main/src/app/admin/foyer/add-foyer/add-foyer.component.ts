import { Component } from '@angular/core';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.scss']
})
export class AddFoyerComponent {
  foyer =new   Foyer ;
  img : string = "./../assets/img/" ;

  constructor(private service:FoyersServiceService)
  {

  }
  addFoyer()
  {
    console.log(this.foyer.image)
   this.foyer.image=this.img.concat(this.foyer.image.substr(12,19));
    this.service.ajouterFoyer(this.foyer).subscribe(()=>
    {
      console.log("Foyer Ajouter")
      console.log(this.foyer.image)
    });
  }


}
