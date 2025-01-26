import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, map } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/admin/components/confirmation-dialog/confirmation-dialog.component';
import { Categorie } from 'src/app/core/models/categorie.model';
import { Livre } from 'src/app/core/models/livre.model';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { LivreService } from 'src/app/core/services/livre.service';
import { ModificationDialogLivreComponent } from 'src/app/admin/livre/components/modification-dialog-livre/modification-dialog-livre.component';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-livre',
  templateUrl: './list-livre.component.html',
  styleUrls: ['./list-livre.component.scss']
})
export class ListLivreComponent {

  constructor(private livreService : LivreService ,  private dialog:MatDialog , private CategorieService:CategorieService , private FormBuilder:FormBuilder , private router:Router){
  }

  urlImage : string  = 'http://localhost:8080/images_livres' 
  msg!:string;
  error!:string;


  category !: Categorie;


  LivreList !: any[]; 
  livreDetailsList: any[] = []; 

  filteredLivreList: any[] = [];


  searchCtrl!: FormControl;




   ngOnInit(): void {
     this.livreService.getAllLivres().subscribe((livres: any[]) => {
      this.LivreList = livres;

      this.initLivreDetailsList();
       
    });


    this.initForm();
   }


   private initForm() {
    this.searchCtrl = this.FormBuilder.control('');  
  }

  initLivreDetailsList(): void {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      switchMap(searchTerm => {
        const observables: Observable<any>[] = this.LivreList.map(livre => {
          const categorieObservable = this.CategorieService.getCategorieDuLivre(livre.idLivre);
  
          return categorieObservable.pipe(
            map(categorieDetails => ({
              livre,
              categorie: categorieDetails
            }))
          );
        });

      
  
        return forkJoin(observables).pipe(
          map((result: any[]) =>
            result.filter(item =>
              this.matchSearchTerm(item, searchTerm))
            
          )
        );
      })
    );
  
    search$.subscribe((filteredResults: any[]) => {
      this.livreDetailsList = filteredResults;
      console.log(filteredResults);
    });
  }


  private matchSearchTerm(item: any, searchTerm: string): boolean {
    const lowerCaseTerm = searchTerm.toLowerCase();
  
    const titreMatch = item.livre.titre.toLowerCase().includes(lowerCaseTerm);
    const auteurMatch = item.livre.nomAuteur.toLowerCase().includes(lowerCaseTerm);
    const dispoMatch = item.categorie.nom.toLowerCase().includes(lowerCaseTerm);
    const descriptionMatch = item.livre.description.toLowerCase().includes(lowerCaseTerm);

  
    return titreMatch || auteurMatch || dispoMatch || descriptionMatch;
  }


   openModalModification(id:any, idCategorie:any): void {
    const dialogRef = this.dialog.open(ModificationDialogLivreComponent, {
      width: '550px',
      height:'500px' ,
      data: { title:"Modification livre" , livreId : id , categorieId:idCategorie}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.livreService.getAllLivres().subscribe((livres: any[]) => {
        this.LivreList = livres;
  
        this.initLivreDetailsList();
         
      });
    });
  
  }


   openModalSuppression(id:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height:'200px' ,
      data: {title:"Suppression livre" , content:"Voulez-vous vraiment supprimer ce livre ?"}

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.confirmed){
      this.livreService.supprimerLivre(id).subscribe(
        ()=>{
            this.msg = "Livre supprimé avec succées"
            this.livreService.getAllLivres().subscribe((livres: any[]) => {
              this.LivreList = livres;
        
              this.initLivreDetailsList();
               
            });
        },
        ()=>{
          this.error = "Il ya une erreur qui est survenu"
        }
      )
    }});
  }

  ajouter(){
    this.router.navigateByUrl("/admin/livre/add")
 }


}
