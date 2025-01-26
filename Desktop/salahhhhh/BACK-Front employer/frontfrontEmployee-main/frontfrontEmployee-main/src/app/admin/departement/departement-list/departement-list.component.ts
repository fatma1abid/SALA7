import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/Departement';
import { Universite } from 'src/app/models/universite';
import { DepartementService } from 'src/app/service/departement.service';
import { UniversiteService } from 'src/app/service/universite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss']
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];
  nomDepartementRecherche: string = '';


  constructor(
    private departementService: DepartementService,
    private universiteService: UniversiteService,
    private router: Router
  ) {
}

  ngOnInit() {
    this.chargerDepartements();
  }

  
  

  chargerDepartements() {
    this.departementService.getAllDepartements().subscribe(
      data => {
        this.departements = data;
        console.log('Départements depuis l\'API:', this.departements);

      },
      error => {
        console.error('Erreur lors de la récupération des départements:', error);
      }
    );
  }

  
  handleDepartementAjoute(departement: Departement) {
    // Gérez l'ajout réussi du département ici
    console.log('Département ajouté avec succès dans le composant parent:', departement);
    // Ajoutez tout autre traitement nécessaire
  }

  navigateToEdit(idDepartement: number) {
    this.router.navigate(['/admin/departement/update', idDepartement]);
  }

  supprimerDepartement(id: number, nomDepartement: string) {
    console.log('ID du département à supprimer :', id);
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer le département ' + nomDepartement + ' ?',
      text: 'Vous ne pourrez pas récupérer ces données après la suppression !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        if (!isNaN(id) && id !== null && id !== undefined) {
          this.departementService.deleteDepartement(id).subscribe(
            () => {
              console.log('Département supprimé avec succès');
              this.chargerDepartements();
            },
            error => {
              console.error('Erreur lors de la suppression du département:', error);
            }
          );
          Swal.fire(
            'Supprimé !',
            'Le département a été supprimé avec succès.',
            'success'
          );
        } else {
          console.error('ID invalide. La suppression du département ne peut pas être effectuée.');
        }
      }
    });
  }
}
