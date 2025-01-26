import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { Foyer } from 'src/app/Model/Foyer';
import { BlocsServiceService } from 'src/app/Service/blocs-service.service';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-consulter-bloc',
  templateUrl: './consulter-bloc.component.html',
  styleUrls: ['./consulter-bloc.component.scss']
})
export class ConsulterBlocComponent {
  
  listbloc!:Bloc[]
  recherche!:string ; 
  F !:any;
  id!:number;
  filteredList1 = this.listbloc;

  constructor(private service:BlocsServiceService, private route:Router,private router:ActivatedRoute)
  {
      this.id= this.router.snapshot.params['idFoyer']
    

  }
 
  ngOnInit()
  {

    this.service.FgetListBlocByIdFoyer(this.id).subscribe(result=>{
      this.listbloc=result;
      this.filteredList1=result;
    });
    console.log(this.listbloc)

  }
  updateFilteredList() {
   
    this.filteredList1 = this.listbloc.filter(bloc => bloc.nomBloc.includes(this.recherche));

   
  }
}
