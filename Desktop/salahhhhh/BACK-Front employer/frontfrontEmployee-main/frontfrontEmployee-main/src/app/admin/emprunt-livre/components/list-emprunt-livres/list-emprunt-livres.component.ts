import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, map, startWith, switchMap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/admin/components/confirmation-dialog/confirmation-dialog.component';
import { empruntLivre } from 'src/app/core/models/empruntLivre.models';
import { EmpruntLivreService } from 'src/app/core/services/empruntLivre.service';
import { LivreService } from 'src/app/core/services/livre.service';
import { ModificationEmpruntLivreComponent } from '../modification-emprunt-livre/modification-emprunt-livre.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-emprunt-livres',
  templateUrl: './list-emprunt-livres.component.html',
  styleUrls: ['./list-emprunt-livres.component.scss']
})
export class ListEmpruntLivresComponent implements OnInit {


  constructor( private EmpruntLivreService:EmpruntLivreService ,
     private dialog:MatDialog , private livreService:LivreService  ,
      private formBuilder:FormBuilder , private router:Router,
      private userService:UserService){
  }



  msg!:string;
  error!:string;

  empruntLivreList !: any[]; 
  empruntDetailsList: any[] = []; 

  searchCtrl!: FormControl;

  nbreEmprunts !: any;

  nbreEmpruntsEncours !: any;


  nbreEmpruntsAccepte !: any;

  livre!:any



  ngOnInit(): void {
    this.EmpruntLivreService.getAllEmpruntLivre().subscribe((emprunts: any[]) => {
      this.empruntLivreList = emprunts;

      this.initEmpruntDetailsList();
    });

    this.initForm();

    this.EmpruntLivreService.getNbreEmpruntLivre().subscribe(
      (nombre: number) => {
        this.nbreEmprunts = nombre;
    })

    this.EmpruntLivreService.getNbreEmpruntLivreEncours().subscribe(
        (nombre: number) => {
          this.nbreEmpruntsEncours = nombre;
    })  

    this.EmpruntLivreService.getNbreEmpruntLivreAccepte().subscribe(
      (nombre: number) => {
        this.nbreEmpruntsAccepte = nombre;
    })

    /*this.livreService.getLivreWithMaxEmprunts().subscribe(
      (livre) => {
         this.livre = livre
      }
    )*/
  }

  
  private initForm() {
    this.searchCtrl = this.formBuilder.control('');  
  }


  initEmpruntDetailsList(): void {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      switchMap(searchTerm => {
        const observables: Observable<any>[] = this.empruntLivreList.map(emprunt => {
          const userObservable = this.userService.getUserByEmprunt(emprunt.idEmprunt);
          const livreObservable = this.livreService.getLivreByEmprunt(emprunt.idEmprunt);
  
          return forkJoin([userObservable, livreObservable]).pipe(
            map(([userDetails, livreDetails]) => ({
              emprunt,
              user: userDetails,
              livre: livreDetails
            }))
          );
        });
  
        return forkJoin(observables).pipe(
          map((result: any[]) =>
            result.filter(item => this.matchSearchTermEmprunt(item, searchTerm))
          )
        );
      })
    );
  
    search$.subscribe((filteredResults: any[]) => {
      this.empruntDetailsList = filteredResults;
    });
  }
  
  private matchSearchTermEmprunt(item: any, searchTerm: string): boolean {
    const lowerCaseTerm = searchTerm.toLowerCase();
  
    const titleMatch = item.livre.titre.toLowerCase().includes(lowerCaseTerm);
    const nomEtMatch = item.user.nomEt.toLowerCase().includes(lowerCaseTerm);
    const prenomEtMatch = item.user.prenomEt.toLowerCase().includes(lowerCaseTerm);
    const emailMatch = item.user.email.toLowerCase().includes(lowerCaseTerm);
  
    return titleMatch || nomEtMatch || prenomEtMatch || emailMatch;
  }




  accepterDemandeEmprunt(id:any , email:string, idLivre:any){
      this.EmpruntLivreService.accepterDemandeEmprunt(id,email,idLivre).subscribe(
        ()=>{
          this.msg = "Demande accepté avec succées"
          this.EmpruntLivreService.getAllEmpruntLivre().subscribe((emprunts: any[]) => {
            this.empruntLivreList = emprunts;
      
            this.initEmpruntDetailsList();
          });
        },
        ()=>{
          this.error = "Il ya une erreur qui est survenu"
        }
      )
  }


  refuserDemandeEmprunt(idEmprunt:any ,idLivre:any,idEtudiant:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height:'200px' ,
      data: {title:"Refus demande" , content:"Voulez-vous vraiment refuser cette demande ?"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.confirmed){
      this.EmpruntLivreService.refuserDemandeEmprunt(idEmprunt,idLivre,idEtudiant).subscribe(
        ()=>{
            this.msg = "Demande refusé avec succées"
            this.EmpruntLivreService.getAllEmpruntLivre().subscribe((emprunts: any[]) => {
              this.empruntLivreList = emprunts;
        
              this.initEmpruntDetailsList();
            });
        },
        ()=>{
          this.error = "Il ya une erreur qui est survenu"
        }
      )
    }});
  }



  openModalModification(id:any , livre:any): void {
    const dialogRef = this.dialog.open(ModificationEmpruntLivreComponent, {
      width: '500px',
      height:'450px' ,
      data: { title:"Modification Emprunt Livre" , empruntId : id , livreId:livre}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.EmpruntLivreService.getAllEmpruntLivre().subscribe((emprunts: any[]) => {
        this.empruntLivreList = emprunts;
  
        this.initEmpruntDetailsList();
      });
    });
  
  }


  openModalSuppression(id:any , livre:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height:'200px' ,
      data: {title:"Suppression emprunt livre" , content:"Voulez-vous vraiment supprimer cette emprunt ?"}

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.confirmed){
      this.EmpruntLivreService.supprimerEmpruntLivre(id,livre).subscribe(
        ()=>{
            this.msg = "emprunt livre supprimé avec succées"
            this.EmpruntLivreService.getAllEmpruntLivre().subscribe((emprunts: any[]) => {
              this.empruntLivreList = emprunts;
        
              this.initEmpruntDetailsList();
            });
        },
        ()=>{
          this.error = "Il ya une erreur qui est survenu"
        }
      )
    }});
  }


  ajouter(){
    this.router.navigateByUrl("/admin/empruntLivre/add")
  }


}


