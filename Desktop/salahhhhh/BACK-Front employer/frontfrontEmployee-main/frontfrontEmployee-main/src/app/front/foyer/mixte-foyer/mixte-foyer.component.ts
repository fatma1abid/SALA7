import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-mixte-foyer',
  templateUrl: './mixte-foyer.component.html',
  styleUrls: ['./mixte-foyer.component.scss']
})
export class MixteFoyerComponent {
 listFM!:Foyer[];
  f = new Foyer();

  constructor(private service:FoyersServiceService, private route:Router,private router:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.service.showAllFoyerMixte().subscribe(result=>{
      this.listFM=result;
     
    });
   
  }
  i!:number;
  traitement(t:any)
  {
   console.log(t);
   let index : number =this.listFM.indexOf(t);
   if(index != -1)
   {
    this.i=this.listFM.length;
   }

  }

}
