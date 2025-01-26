import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from 'src/app/service/departement.service';
import { UniversiteService } from 'src/app/service/universite.service';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const nomUniversite = params['nomUniversite'];
      this.getDepartementsByUniversite(nomUniversite);
    });
  }

  getDepartementsByUniversite(nomUniversite: string): void {
    this.universiteService
      .getDepartementsByNomUniversite(nomUniversite)
      .subscribe(
        (data) => {
          this.departements = data;
          console.log('Departements for university:', this.departements);
        },
        (error) => {
          console.error(
            'Error fetching departements for university:',
            error
          );
        }
      );
  }

  // Ajoutez cette fonction pour obtenir l'index dans la boucle
  trackByFn(index: any, item: any) {
    return index;
  }
}