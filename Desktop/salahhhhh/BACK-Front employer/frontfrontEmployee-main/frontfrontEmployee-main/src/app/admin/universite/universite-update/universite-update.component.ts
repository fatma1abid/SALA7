import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/service/universite.service';

@Component({
  selector: 'app-universite-update',
  templateUrl: './universite-update.component.html',
  styleUrls: ['./universite-update.component.scss']
})
export class UniversiteUpdateComponent implements OnInit {
 @Input() universite: Universite = new Universite();
 @Output() universiteUpdated: EventEmitter<Universite> = new EventEmitter();


  constructor(
    private universiteService: UniversiteService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const originalId = params['id']; // Use a different variable name
  
      console.log('id:', originalId);
  
      const convertedId = +originalId; // Utiliser l'opérateur de conversion pour s'assurer que id est un nombre
  
      if (!isNaN(convertedId)) {
        console.log('Converted id:', convertedId);
  
        this.universiteService.getUniversiteById(convertedId).subscribe(
          (data: Universite) => {
            this.universite = data;
            console.log('Fetched universite data:', data);
            this.cd.detectChanges();
          },
          (error) => {
            console.error('Error fetching universite:', error);
          }
        );
      } else {
        console.error('Invalid id:', originalId);
      }
    });
  }
  
  
  enregistrerUniversite(f: NgForm) {
    const id = this.universite.idUniversite;
    this.universiteService.updateUniversite(id, this.universite).subscribe(
      (data) => {
        console.log('Universite updated successfully:', data);
        this.universiteUpdated.emit(data); // Émettre l'événement vers le composant parent
        this.router.navigate(['/admin/universite/afficher']);
      },
      (error) => {
        console.error('Error updating universite:', error);
      }
    );
  }
}
