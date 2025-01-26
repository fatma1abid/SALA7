import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-detail-foyer',
  templateUrl: './detail-foyer.component.html',
  styleUrls: ['./detail-foyer.component.scss']
})
export class DetailFoyerComponent {

  f !:any;
  id!:number;
  sum!:number;

  constructor(private s:FoyersServiceService,private route:ActivatedRoute,private router:Router)
  {

  }
  ngOnInit()
  {
    this.id=this.route.snapshot.params['idFoyer']

    this.s.getById(this.id).subscribe(result =>
    {
      this.f=result;
    });
   
    this.s.FgetSumBlocByFoyer(this.id).subscribe((result) => {
      this.sum = result as number;
    });



  }
  consulterBib(id:number){
  this.router.navigate(['/front/Bib/'+id])

  
}
}
