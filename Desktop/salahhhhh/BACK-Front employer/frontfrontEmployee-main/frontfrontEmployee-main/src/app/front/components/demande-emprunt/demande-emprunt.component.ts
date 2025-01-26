import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Livre } from 'src/app/core/models/livre.model';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { EmpruntLivreService } from 'src/app/core/services/empruntLivre.service';
import { LivreService } from 'src/app/core/services/livre.service';

@Component({
  selector: 'app-demande-emprunt',
  templateUrl: './demande-emprunt.component.html',
  styleUrls: ['./demande-emprunt.component.scss']
})
export class DemandeEmpruntComponent implements OnInit{
    
  constructor(private livreService:LivreService , private empruntLivreService:EmpruntLivreService,private formBuilder:FormBuilder , private route:ActivatedRoute , private router:Router){

  }


  idLivre !: number;

  livre$ !: Observable<Livre>;


  empruntForm !: FormGroup

  email !: RegExp;


  msg !: string;

  error !: string;

  ngOnInit(): void {

    this.email = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")

    this.idLivre = this.route.snapshot.params['idLivre'];

    this.livre$ = this.livreService.getLivre(this.idLivre);

    this.empruntForm = this.formBuilder.group({
      dateDebutEmprunt: [null, [Validators.required]],
      dateFinEmprunt: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.email)]]},
      )
  }



  get f() {
    return this.empruntForm.controls;
  }


  emprunterLivre(){
     this.empruntLivreService.addEmpruntLivre(this.empruntForm.get('email')?.value,this.empruntForm.get('dateDebutEmprunt')?.value,this.empruntForm.get('dateFinEmprunt')?.value , this.idLivre).subscribe(
      ()=>{
        this.msg = "La demande a eté envoyé avec succées, nous vous enverrons un e-mail de confirmation pour l'emprunt"
        this.empruntForm.reset();
        
        
     },
     ()=>{
          this.error = "Il ya une erreur qui est survenu"
     }
     )
  }


  annuler(){
     this.router.navigateByUrl('/front/listCategory');
  }


}
