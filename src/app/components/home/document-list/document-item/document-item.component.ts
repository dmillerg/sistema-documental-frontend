import { ModalDeleteComponent } from 'src/app/components/modals/modal-delete/modal-delete.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDocumentComponent } from './../../../modals/modal-document/modal-document.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() id: number = -1;
  @Input() src_document: string = './../../../../../ctc.png';
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() estado: boolean = false;
  @Output() emisor: EventEmitter<boolean> = new EventEmitter();
  estado_text: string = 'public';

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.estado) this.estado_text = 'private';
    this.api.getDocumentsFoto(this.id).subscribe((result) => {
      this.src_document = result + '';
    }, (error) => {
      this.src_document = error.url;
    })
  }

  deleteDocument() {
    var modal = this.modalService.open(ModalDeleteComponent);
    modal.componentInstance.modalHeader = "Documento";
    modal.componentInstance.id = this.id;
    modal.result.then((result) => {
      if (result) {
        this.emisor.emit(true);
      }
    });
  }

  updateDocument() {
    const modal = this.modalService.open(ModalDocumentComponent, { size: 'sm' });
    let form_document = new FormGroup({
      id: new FormControl(this.id),
      title: new FormControl(this.title),
      descripcion: new FormControl(this.description),
      imagen: new FormControl(this.title+'.jpg'),
      date: new FormControl(this.date),
    });
    modal.componentInstance.modalHeader = "documentos";
    modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
    modal.componentInstance.modal_action = "Editar";
    modal.componentInstance.form_document = form_document;
    modal.componentInstance.src_document = this.src_document;
    modal.componentInstance.estado = this.estado;
    modal.result.then((result) => {
      if (result) {
        this.emisor.emit(true);
      }
    });
  }
}
