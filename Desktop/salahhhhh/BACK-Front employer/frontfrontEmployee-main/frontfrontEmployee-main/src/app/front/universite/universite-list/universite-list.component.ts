import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/Departement';
import { Universite } from 'src/app/models/universite';
import { DepartementService } from 'src/app/service/departement.service';
import { FavorisService } from 'src/app/service/favoris.service';
import { UniversiteService } from 'src/app/service/universite.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-universite-list',
  templateUrl: './universite-list.component.html',
  styleUrls: ['./universite-list.component.scss']
})
export class UniversiteListComponent implements OnInit {
  universites: Universite[] = [];
  departements: Departement[] = []; // Ajoutez cette ligne
  nomUniversiteRecherche: string = '';
  isSortedAscending: boolean = true; 
  universitesFavorites: Universite[] = [];  // Nouvelle liste pour les favoris
  afficherFavoris: boolean = false;
  
  constructor(
    private universiteService: UniversiteService,
    private departementService: DepartementService, // Ajoutez cette ligne
    private router: Router,
    private favorisService: FavorisService
  ) {}

  ngOnInit() {
    this.chargerUniversites();
  }

  chargerUniversites() {
    this.universiteService.findAllUniversites().subscribe(
      data => {
        this.universites = data;
        // Mettez à jour également la liste des favoris
        this.actualiserFavoris();
        console.log('Universites from API:', this.universites);
      },
      error => {
        console.error('Error fetching universites:', error);
      }
    );
  }

  actualiserFavoris(): void {
    // Mettez à jour la liste des favoris en filtrant les universités favorites
    this.universitesFavorites = this.universites.filter(universite => this.favorisService.estFavori(universite));
  }

  onGetDepartementsButtonClick(nomUniversite: string): void {
    // Utilisez le Router pour naviguer vers la page des départements avec le nom de l'université en tant que paramètre
    this.router.navigate(['/front/departement', nomUniversite.toLowerCase()]);
  }

  trierUniversitesCroissant() {
    this.universites.sort((a, b) => {
      const order = this.isSortedAscending ? 1 : -1;
      return order * a.nomUniversite.toLowerCase().localeCompare(b.nomUniversite.toLowerCase());
    });
    this.isSortedAscending = !this.isSortedAscending;
  }  

  toggleFavori(universite: Universite): void {
    if (this.favorisService.estFavori(universite)) {
      this.favorisService.supprimerFavori(universite);
    } else {
      this.favorisService.ajouterFavori(universite);
    }

    // Mettez à jour la liste des favoris après chaque modification
    this.actualiserFavoris();
  }

  estFavori(universite: Universite): boolean {
    return this.favorisService.estFavori(universite);
  }


  consulterFavoris(): void {
    this.afficherFavoris = !this.afficherFavoris;
  }
  
}
