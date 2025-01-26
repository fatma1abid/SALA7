import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PaginationDirective } from '../../../shared/directives/pagination.directive';

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent  implements OnInit{
  @ViewChild(PaginationDirective, { static: true }) paginationDirective!: PaginationDirective;
  isLoading:boolean=false;
  users!:any[];
  selectedUser:any;
  paginatedUsers: any[] = [];
  itemsPerPage: number = 1;
  currentPage: number = 1;
  totalPages: number = 0;
  items:any[] =[];
  isEdit:boolean = false;
  selectedForUpdate!:any;
  constructor(private userService:UserService ){
  }
  ngOnInit(): void {
  
    this.userService.getEtudiantNonArchive("ETUDIANT","archive").subscribe({

      next:(users) =>{
        this.users = users;
        this.items= users;
      },
      error:(error)=>{}
            
    }
    )
  }
  changerEtat(user:any,etat:String){
    const id = user.idEtudiant;
    this.isLoading =true;
    if(user.etat == "non confirmé" && etat=="validé"){
      alert("l'etudiant n'est pas encore verifié sont email")
    }
    this.userService.changerEtat(id,etat).subscribe(
      result=>{
        const updatedUserIndex = this.users.findIndex(u => u.idEtudiant === id);
      //  this.isLoading =false;
        if (updatedUserIndex !== -1 && etat!="archivé") {
          this.users[updatedUserIndex].etat = etat;
        }else if (updatedUserIndex !== -1 && etat=="archivé") {
         this.users.splice( updatedUserIndex , 1);
         this.users;
        }
      }
    )
    
  }
selectUser(user:any){
 this.selectedUser = user;
}
updateItems(items: any[]): void {
  this.paginatedUsers = items;
}
editModal(etudiant:any){
  this.isEdit =true;
  this.selectedForUpdate = etudiant;
}
addForm(){
  this.isEdit =false;
}
rechargeEtudiants(){
  this.userService.getEtudiantNonArchive("ETUDIANT","archive").subscribe({
    next:(users) =>{
      this.users = users;
      this.items= users;
    },
    error:(error)=>{}
  });
}
updateCurrentPage(pageNumber: number): void {
  this.currentPage = pageNumber;
}
 setPage(pageNumber: number): void {
    // Call the setPage method of PaginationDirective
    // This will trigger the paginatedItems and currentPage outputs
    this.paginationDirective.setPage(pageNumber);
  }
}
