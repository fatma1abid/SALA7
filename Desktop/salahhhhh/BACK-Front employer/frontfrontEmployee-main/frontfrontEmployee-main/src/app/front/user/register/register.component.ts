import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
registerForm !:FormGroup;
showModal: boolean = false;
showSpinner: boolean = false;
spinnerMessage: string | null = null;
showMessage: boolean = false;
successMessage: string | null = null;
errorMessage: string | null = null;
passwordRegex:RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;;
emailRegex:RegExp=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
constructor(private formBuilder :FormBuilder,private userService:UserService,private route:Router){

}
    ngOnInit(): void {
      this.registerForm =this.formBuilder.group({
        nomEt: ['', Validators.required],
        prenomEt: ['', Validators.required],
        cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Sync validator for 8 digits
        email : ['',  [Validators.required, Validators.pattern(this.emailRegex)]],
        password: ['',  [Validators.required, Validators.pattern(this.passwordRegex)]],
        confirmPassword:['', Validators.required],
        acceptTerms:[false, [Validators.requiredTrue]],

        },
        {
          validators: [this.match('password', 'confirmPassword')]
        });
     }
     get myControls(){
      return this.registerForm.controls;
   }
   match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
 
  onSubmitForm(){
    this.showSpinner = true;
    this.spinnerMessage = 'Loading...';
    this.userService.register(this.registerForm.value).subscribe({
      next: (v) => {
        // this.route.navigateByUrl("front/login");
         //this.isModalVisible = true;
         this.showSpinner = false;
         this.spinnerMessage = null;
         this.showMessage = true;
         this.successMessage = 'un message de confirmation a été envoyé à' + v.email ;
         this.errorMessage = null;
         setTimeout(() => {
          this.showMessage = false;
          this.successMessage = null;
          this.errorMessage = null;
          this.showModal = false;
        }, 4000);
       },
       error: (e) => {
        this.showSpinner = false;
         this.spinnerMessage = null;
         this.showMessage = true;
         this.successMessage = null ;
         this.errorMessage = "Erreur lors de l'inscription";
        if (e.status === 400) {
          this.errorMessage  = 'L\'adresse e-mail existe déjà.';
      
      }
      setTimeout(() => {
        this.showMessage = false;
        this.successMessage = null;
        this.errorMessage = null;
        this.showModal = false;
      }, 4000);
    },complete:()=>{
        setTimeout(() => {
          this.showMessage = false;
          this.successMessage = null;
          this.errorMessage = null;
          this.showModal = false;
        }, 4000);
      
     
    }
     
     
    });
  }
  
}



