import { Component,OnInit ,Input,OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit,OnChanges{
  @Input() etudiant!:any;
  @Input() isEdit :boolean =false;
  @Output() isChange = new EventEmitter<boolean>();

  alertType!: 'success' | 'error' ;
  alertMessage!: string | null ;
  type:string = "Ajouter";
  isModalVisible: boolean = false;
  emailSentMessage!: string;
  registerForm !:FormGroup;
  passwordRegex:RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;;
  emailRegex:RegExp=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private formBuilder :FormBuilder,private userService:UserService,private route:Router){
  
  }
      ngOnInit(): void {
        if(this.isEdit == false){
        this.registerForm =this.formBuilder.group({
          nomEt: ['', Validators.required],
          prenomEt: ['', Validators.required],
          cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Sync validator for 8 digits
          email : ['',  [Validators.required, Validators.pattern(this.emailRegex)]],
          password: ['',  [Validators.required, Validators.pattern(this.passwordRegex)]],
          confirmPassword:['', Validators.required],
  
          },
          {
            validators: [this.match('password', 'confirmPassword')]
          });
       }else if(this.isEdit == true){
        this.registerForm =this.formBuilder.group({
          nomEt: ['', Validators.required],
          prenomEt: ['', Validators.required],
          cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Sync validator for 8 digits
          email : ['',  [Validators.required, Validators.pattern(this.emailRegex)]],
          }
          );
       }
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
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['isEdit'] && this.isEdit) {

        this.registerForm =this.formBuilder.group({
          nomEt: ['', Validators.required],
          prenomEt: ['', Validators.required],
          cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Sync validator for 8 digits
          email : ['',  [Validators.required, Validators.pattern(this.emailRegex)]],
          }
          );
          this.registerForm.patchValue(this.etudiant);

          this.type = "Modifier"
      }
      else if (changes['isEdit'] && !this.isEdit) {
        this.registerForm =this.formBuilder.group({
          nomEt: ['', Validators.required],
          prenomEt: ['', Validators.required],
          cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Sync validator for 8 digits
          email : ['',  [Validators.required, Validators.pattern(this.emailRegex)]],
          password: ['',  [Validators.required, Validators.pattern(this.passwordRegex)]],
          confirmPassword:['', Validators.required],
  
          },
          {
            validators: [this.match('password', 'confirmPassword')]
          });
          this.type = "Ajouter"
      }
    }
    onSubmitForm(){
      if(!this.isEdit){
        this.userService.register(this.registerForm.value).subscribe({
        next: (v) => {
          // this.route.navigateByUrl("front/login");
          this.alertType ='success';
          this.alertMessage ='etudiant ajouté avec succés'
          this.isChange.emit();
          setTimeout(() => {
            this.alertMessage = null;
          
          }, 4000);         },
         error: (e) => {
          if (e.status === 400) {
            this.alertType ='error';
            this.alertMessage ='L\'adresse e-mail existe déjà.';
            setTimeout(() => {
              this.alertMessage = null;
            
            }, 4000);
        }
      
      },
      complete:()=>{
        this.isModalVisible = false;
      }
    
       
       
      });
      }else{
        this.userService.updateUser(this.etudiant.idEtudiant,this.registerForm.value).subscribe(
          {

          next: (v) => {
            this.alertType ='success';
            this.alertMessage ='etudiant modifié avec succés'
            setTimeout(() => {
              this.alertMessage = null;
            
            }, 4000);
            this.isChange.emit();

           },
           error: (e) => {
            
            this.alertType ='error';
            this.alertMessage ='erreur du modification'
            setTimeout(() => {
              this.alertMessage = null;
            
            }, 4000);
          },
          complete:()=>{
            this.isModalVisible = false;
          }
        }
        );
      }
  
    }
  
}



