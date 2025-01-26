import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/service/universite.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-universite-list',
  templateUrl: './universite-list.component.html',
  styleUrls: ['./universite-list.component.scss']
})
export class UniversiteListComponent implements OnInit {
  universites: Universite[] = [];
  nomUniversiteRecherche: string = '';
  universiteParDefaut: Universite = new Universite(); // Définissez les données par défaut ici


  constructor(private universiteService: UniversiteService, private router: Router) {}

  ngOnInit() {
    this.chargerUniversites();
  }

  chargerUniversites() {
    this.universiteService.findAllUniversites().subscribe(
      data => {
        this.universites = data;
        console.log('Universites from API:', this.universites);

        // Affectez la première université de la liste comme universiteParDefaut
        if (this.universites.length > 0) {
          this.universiteParDefaut = this.universites[0];
        }
      },
      error => {
        console.error('Error fetching universites:', error);
      }
    );
  
  }
  navigateToEdit(id: number) {
    this.router.navigate(['/admin/universite/update', id]);
  }

  supprimerUniversite(id: number, nomUniversite: String) {
    console.log('ID du universite à supprimer :', id); // Ajoutez cette ligne

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer l\'université ' + nomUniversite + ' ?',
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
        this.universiteService.deleteUniversite(id).subscribe(
          () => {
            console.log('Universite deleted successfully');
            // Rechargez la liste des universités après la suppression
            this.chargerUniversites();
          },
          error => {
            console.error('Error deleting universite:', error);
          }
        );
        Swal.fire(
          'Supprimée !',
          'L\'université a été supprimée avec succès.',
          'success'
          );
        } else {
          console.error('ID invalide. La suppression du universite ne peut pas être effectuée.');
        }
      }
    });
  }
  
}
