import { Serializer } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { BlocsServiceService } from 'src/app/Service/blocs-service.service';

@Component({
  selector: 'app-update-bloc',
  templateUrl: './update-bloc.component.html',
  styleUrls: ['./update-bloc.component.scss']
})
export class UpdateBlocComponent {
  bloc = new Bloc
  formData: any = {}; 
  
  constructor(private service:BlocsServiceService, private router:ActivatedRoute,private route:Router)
  {

  }
  ngOnInit()
  {
    this.bloc.idBloc=this.router.snapshot.params['idBloc'];
    this.service.FGetBlocById(this.router.snapshot.params['idBloc']).subscribe(data => {
      // Remplissez le formulaire avec les valeurs existantes
      this.formData = data;});
      
  }
  updateBloc()
  {
   
    this.service.FUpdateBloc(this.bloc).subscribe(()=>
    {
      console.log("update bien ")
      this.route.navigate(["/admin/bloc/ShowBloc/"+this.bloc.idBloc])
    })


  }
}
