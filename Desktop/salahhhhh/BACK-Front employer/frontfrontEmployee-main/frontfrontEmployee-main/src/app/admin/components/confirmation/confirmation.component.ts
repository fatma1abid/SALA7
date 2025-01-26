 
import { Component , Inject } from '@angular/core';
import { MatDialogRef ,  MAT_DIALOG_DATA, } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}



  confirm(): void {
    // Emit the user's choice along with any necessary data
    this.dialogRef.close({ confirmed: true });
  }
  non(): void {
    // Emit the user's choice along with any necessary data
    this.dialogRef.close({   });
  }






}
