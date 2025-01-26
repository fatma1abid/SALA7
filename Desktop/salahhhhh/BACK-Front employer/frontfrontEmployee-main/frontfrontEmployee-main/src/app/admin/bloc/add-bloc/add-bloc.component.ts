import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { Foyer } from 'src/app/Model/Foyer';
import { BlocsServiceService } from 'src/app/Service/blocs-service.service';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';

@Component({
  selector: 'app-add-bloc',
  templateUrl: './add-bloc.component.html',
  styleUrls: ['./add-bloc.component.scss']
})
export class AddBlocComponent {
  bloc =new  Bloc
  formBuild!:FormGroup;
  listFoyer!:Foyer[]
  constructor(private service:BlocsServiceService,private router:Router,private fb:FormBuilder,private s:FoyersServiceService )
  {

  }

 
  addBloc()
  {
    this.service.FAjouterBloc(this.bloc).subscribe(()=>
    {
      console.log("bloc Ajouter")

      this.router.navigate(["/admin/bloc/showFoyer"])
    })
    


  }

  ngOnInit()
  {
    this.formBuild= this.fb.group({
    nomBloc: ['',[Validators.required]],
    capaciteBloc:['',[Validators.required,Validators.minLength(100)]],
    
    //this.service.
    
   

  })
  this.s.showAllFoyer().subscribe((res)=>
  {
    this.listFoyer=res;

  })
  }
  

}
