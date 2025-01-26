import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-sent-modal',
  templateUrl: './confirmation-sent-modal.component.html',
  styleUrls: ['./confirmation-sent-modal.component.scss']
})
export class ConfirmationSentModalComponent {
  @Input() modalId!: string;
  @Input() message!: string;

  @Input()isModalVisible!:boolean;
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    // Emit the event when the modal is closed
    this.closeModalEvent.emit();
  }
}
