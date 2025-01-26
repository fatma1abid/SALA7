import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { BlocsServiceService } from 'src/app/Service/blocs-service.service';

@Component({
  selector: 'app-affecter-bloc',
  templateUrl: './affecter-bloc.component.html',
  styleUrls: ['./affecter-bloc.component.scss']
})
export class AffecterBlocComponent {
  ListBloc !: Bloc[]
  m!:String
  bloc!:Bloc;
  
  constructor(private service: BlocsServiceService,private route : Router,private router:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.m=this.router.snapshot.params['nomFoyer']

    this.service.FgetBlocNonAffecter().subscribe((result)=>{
      
      this.ListBloc=result;
    })
  }
  affecterBloc(nomBloc : String)
  {

    this.service.FaffecterBlocAFoyer(nomBloc,this.m).subscribe(()=>{
      console.log("affecter bien")
    })
    window.location.reload();

  }

}
