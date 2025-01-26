import { Component , Inject } from '@angular/core';
import { MatDialogRef ,  MAT_DIALOG_DATA, } from '@angular/material/dialog';



@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {}


  confirm(): void {
    // Emit the user's choice along with any necessary data
    this.dialogRef.close({ confirmed: true });
  }


}

