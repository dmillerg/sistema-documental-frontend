import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal-documents',
  templateUrl: './modal-documents.component.html',
  styleUrls: ['./modal-documents.component.css']
})
export class ModalDocumentsComponent implements OnInit {

  modalHeader: string = '';
  modalmessage: string = '';
  actiModal: NgbActiveModal;
  constructor(private activeModal: NgbActiveModal) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
  }

}
