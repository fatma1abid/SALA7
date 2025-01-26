import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { LivreService } from 'src/app/core/services/livre.service';

@Component({
  selector: 'app-livre-details',
  templateUrl: './livre-details.component.html',
  styleUrls: ['./livre-details.component.scss']
})
export class LivreDetailsComponent implements OnInit {


  constructor(private livreService:LivreService , private route:ActivatedRoute , private categorieService:CategorieService,private router:Router
    ,  @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LivreDetailsComponent>){

  }


  idLivre !: number;

  livre$ !: Observable<any>;

  urlImage : string  = 'http://localhost:8080/images_livres' ;


  ngOnInit(): void {
    this.livre$ = this.livreService.getLivre(this.data.idLivre);
  }


  DemandeEmpruntLivre(id: any){
    this.dialogRef.close();
    this.router.navigateByUrl(`/front/emprunterLivre/${id}`)
  }

}
