import { Component } from '@angular/core';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-delete-foyer',
  templateUrl: './delete-foyer.component.html',
  styleUrls: ['./delete-foyer.component.scss']
})
export class DeleteFoyerComponent {

  constructor(private service:FoyersServiceService)
  {

  }

}
