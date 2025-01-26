import { Component ,Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foyer } from 'src/app/Model/Foyer';
import { FoyersServiceService } from 'src/app/Service/foyers-service.service';


@Component({
  selector: 'app-consulter-foyer',
  templateUrl: './consulter-foyer.component.html',
  styleUrls: ['./consulter-foyer.component.scss']
})
export class ConsulterFoyerComponent {


  isButtonClickedM = false;
  isButtonClickedS = false;

  list!:Foyer[]
  f = new Foyer();
  recherche!:string ; 
  filteredList1 = this.list;

  constructor(private service:FoyersServiceService, private route:Router,private router:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.service.showAllFoyer().subscribe(result=>{
      this.list=result;
      this.filteredList1=result
    });
    console.log(this.list)

  }
  consuletDetail(a:number)
  {
    this.route.navigate(['/front/bloc/Consulter/'+a])

  }
  handleClick() {
    this.isButtonClickedM = true;
  }
  handleClickdb(){
    this.isButtonClickedM = false;
  }
  handleClickdb1(){
    this.isButtonClickedS = false;
  }
  handleClick1() {
    this.isButtonClickedS = true;
  }
  detail()
  {
    this.route.navigate(['/front/foyer/FoyerM'])

  }
  chercherFoyer()
  {
    
    this.service.showAllFoyer().subscribe(result=>{
      this.list=result;
     
    });
    console.log(this.list)

    

  }
  updateFilteredList() {
   
    this.filteredList1 = this.list.filter(foyer => foyer.nomFoyer.includes(this.recherche));

   
  }

}
