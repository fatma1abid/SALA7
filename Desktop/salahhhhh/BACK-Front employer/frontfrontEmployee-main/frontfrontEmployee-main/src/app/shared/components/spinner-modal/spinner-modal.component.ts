import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-modal',
  templateUrl: './spinner-modal.component.html',
  styleUrls: ['./spinner-modal.component.scss']
})
export class SpinnerModalComponent {
  @Input() showSpinner: boolean = false;
  @Input() spinnerMessage: string | null = null;
  @Input() showMessage: boolean = false;
  @Input() successMessage: string | null = null;
  @Input() errorMessage: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  onCloseModal() {
    this.closeModal.emit();
  }
}
