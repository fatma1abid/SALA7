import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit{
constructor(private userService:UserService,
  private route: ActivatedRoute,
  private router: Router
  ){}
ngOnInit(){
  const token = this.route.snapshot.queryParams['token'];

  if (token) {
    this.userService.confirmAccount(token).subscribe(
      {
        next: (v) => this.router.navigateByUrl("/front/login"),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
      
  } else {
    console.log('Invalid confirmation link.');
  }
}}


