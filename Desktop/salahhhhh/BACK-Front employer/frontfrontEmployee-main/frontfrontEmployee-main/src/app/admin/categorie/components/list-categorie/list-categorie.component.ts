import { Component, OnInit } from '@angular/core';
import { Observable , timer } from 'rxjs';
import { Categorie } from 'src/app/core/models/categorie.model';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/admin/components/confirmation-dialog/confirmation-dialog.component';
import { ModificationDialogComponent } from 'src/app/admin/categorie/components/modification-dialog/modification-dialog.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { startWith , map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {


  constructor(private categorieService : CategorieService , private dialog:MatDialog , private FormBuilder:FormBuilder , private router:Router){

  }

  categorieList !: Observable<Categorie[]>
  urlImage : string  = 'http://localhost:8080/images' 
  msg !: string;
  error!:string;

  filteredCategorieList !: any;


  searchCtrl!: FormControl;


   ngOnInit(): void {
    this.categorieList =  this.categorieService.getAllCategorie();

    this.initForm();
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
     );

    

      this.filteredCategorieList = combineLatest([this.categorieList, search$]).pipe(
      map(([categorieList, search]) =>
        categorieList.filter((categorie) => categorie.nom.toLowerCase().includes(search))
      )
    );
   }


   private initForm() {
      this.searchCtrl = this.FormBuilder.control('');  
    }


   openModalModification(id:any): void {
    const dialogRef = this.dialog.open(ModificationDialogComponent, {
      width: '500px',
      height:'450px' ,
      data: { title:"Modification categorie" , categorieId : id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filteredCategorieList = this.categorieService.getAllCategorie();
    });
  
  }



   openModalSuppression(id:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height:'200px' ,
      data: {title:"Suppression categorie" , content:"Voulez-vous vraiment supprimer cette categorie ?"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.confirmed){
      this.categorieService.supprimerCategorie(id).subscribe(
        ()=>{
            this.msg = "Categorie supprimé avec succées"
            this.filteredCategorieList = this.categorieService.getAllCategorie();

        },
        ()=>{
          this.error = "Il ya une erreur qui est survenu"
        }
      )
    }});
  }

  ajouter(){
     this.router.navigateByUrl("/admin/categorie/add")
  }


   
}
