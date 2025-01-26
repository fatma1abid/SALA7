import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  updateForm!:FormGroup;
  user!:any;
  constructor(private userService:UserService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.updateForm =this.formBuilder.group({
      nomEt: ['', Validators.required],
      prenomEt: ['', Validators.required],
      email : ['', Validators.required],
      cin : ['', Validators.required],
      dateNaissance: ['', Validators.required],
      });
      
    this.userService.getUserByEmail(this.userService.getUserEmail()).subscribe(resultat=>{
      this.user = resultat;
      this.updateForm.patchValue(resultat);
    })

  }
  onSubmitForm(){
    this.userService.updateUser(this.user.idEtudiant,this.updateForm.value).subscribe(result=>{
      console.log(result)
    });
  }
  get myControls(){
    return this.updateForm.controls;
 }
}

