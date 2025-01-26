import { Component  , Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from 'src/app/core/models/livre.model';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { LivreService } from 'src/app/core/services/livre.service';
import { LivreDetailsComponent } from '../livre-details/livre-details.component';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.scss']
})
export class LivreComponent {


  constructor(private livreService:LivreService , private route:ActivatedRoute , private categorieService:CategorieService,private router:Router,private dialog:MatDialog){

  }
  
  @Input() livre !: Livre

  urlImage : string  = 'http://localhost:8080/images_livres' ;


  openModalDetails(id:any): void {
    const dialogRef = this.dialog.open(LivreDetailsComponent, {
      width: '550px',
      height:'370px' ,
      data: { title:"" , idLivre : id}
    });
  
  }


}
