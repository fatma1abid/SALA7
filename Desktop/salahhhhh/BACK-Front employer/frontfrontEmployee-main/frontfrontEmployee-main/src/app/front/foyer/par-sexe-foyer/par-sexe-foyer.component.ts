import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-par-sexe-foyer',
  templateUrl: './par-sexe-foyer.component.html',
  styleUrls: ['./par-sexe-foyer.component.scss']
})
export class ParSexeFoyerComponent {
  listFM!:Foyer[];
  f = new Foyer();

  constructor(private service:FoyersServiceService, private route:Router,private router:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.service.showAllFoyerParSexe().subscribe(result=>{
      this.listFM=result;
     
    });
   
  }

}
