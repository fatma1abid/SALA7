import { Component ,EventEmitter,Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-foyer',
  templateUrl: './list-foyer.component.html',
  styleUrls: ['./list-foyer.component.scss']
})
export class ListFOYERComponent {
  constructor(private route:Router)
  {
    
  }
  @Input()productin:any;
  @Output()msg = new EventEmitter();

  consuletDetail(a:number)
  {
    this.route.navigate(['/front/bloc/Consulter/'+a]);
   
    

  }
 
  detail(k:any)
  {
    this.msg.emit(k);
    
    k=k+1;
   
  }
}
