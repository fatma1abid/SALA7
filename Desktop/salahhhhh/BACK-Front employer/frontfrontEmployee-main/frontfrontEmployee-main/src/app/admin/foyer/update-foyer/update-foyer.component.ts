import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-update-foyer',
  templateUrl: './update-foyer.component.html',
  styleUrls: ['./update-foyer.component.scss']
})
export class UpdateFoyerComponent {
  foyer = new Foyer() ;
  formData: any = {}; 
  
  constructor(private service:FoyersServiceService, private a:ActivatedRoute, private route:Router)
  {
    

  }
  ngOnInit() {
  
   this.foyer.idFoyer=this.a.snapshot.params['idFoyer']
   this.service.getById(this.a.snapshot.params['idFoyer']).subscribe(data => {
    // Remplissez le formulaire avec les valeurs existantes
    this.formData = data;});
    }
  updateFoyer()
  {
   
    //this.foyer.idFoyer=this.a.snapshot.params['idFoyer']
    this.service.updateAdmins(this.foyer).subscribe(()=>{
      console.log("update bien")
      this.route.navigate(["/admin/foyer/ShowFoyer"])
    });
  }

}
