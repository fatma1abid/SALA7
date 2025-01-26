import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { timer } from 'rxjs';


@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

    constructor(private formBuilder : FormBuilder , private categorieService:CategorieService , private router:Router ){

    }

    categorieForm !: FormGroup
    selectedFile!: File;
    msg !: String;
    error !: String;

    nameFile!:string


    categorieList: any[] = [];

    onFileChanged(event: any): void {
      this.selectedFile =  event.target.files[0];
  
    }



    ngOnInit(): void {
      this.categorieForm = this.formBuilder.group({
        nom: [null, [Validators.required , Validators.minLength(3)]],
        description: [null, [Validators.required, Validators.minLength(5)]],
        image: [null, [Validators.required]],
      })

      
    }

    get f() {
      return this.categorieForm.controls;
    }


    AjouterCategorie(){
      this.categorieService.addCategorie(this.categorieForm.get('nom')?.value,this.categorieForm.get('description')?.value,this.selectedFile).subscribe(
        ()=>{
           this.msg = "Categorie ajouté avec succées"
           this.categorieForm.reset();
           timer(2000).subscribe(() => {
            this.router.navigateByUrl('/admin/categorie/list');
          });
        },
        ()=>{
             this.error = "Il ya une erreur qui est survenu"
        }
      )
    }

}
