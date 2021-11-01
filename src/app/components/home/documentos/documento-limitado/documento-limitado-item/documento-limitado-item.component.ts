import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './../../../../modals/modal-delete/modal-delete.component';
import { ApiService } from './../../../../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDocumentLimitadoComponent } from 'src/app/components/modals/modal-document-limitado/modal-document-limitado.component';
import * as moment from 'moment';

@Component({
  selector: 'app-documento-limitado-item',
  templateUrl: './documento-limitado-item.component.html',
  styleUrls: ['./documento-limitado-item.component.css']
})
export class DocumentoLimitadoItemComponent implements OnInit {

  @Input() id: number = -1;
  @Input() src_document: string = 'ctc.png';
  @Input() fecha: string = '';
  @Input() titulo: string = '';
  @Input() no: number = -1;
  @Input() procedencia: string = '';
  @Input() movimiento1: string = '';
  @Input() movimiento2: string = '';
  @Input() destruccion: string = '';
  @Input() expediente: string = '';
  @Input() observacion: string = '';
  @Output() emisor: EventEmitter<boolean> = new EventEmitter();
  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.api.getDocumentsLimitFoto(this.id).subscribe((result) => {
      this.src_document = result + '';
    }, (error) => {
      this.src_document = error.url;
    })
  }

  deleteDocument() {
    var modal = this.modalService.open(ModalDeleteComponent);
    modal.componentInstance.modalHeader = "Documento Limitado";
    modal.componentInstance.id = this.id;
    modal.result.then((result) => {
      if (result) {
        this.emisor.emit(true);
      }
    });
  }

  updateDocument() {
    const modal = this.modalService.open(ModalDocumentLimitadoComponent, { backdrop: false });
    let form_document = new FormGroup({
      id: new FormControl(this.id),
      no: new FormControl(this.no),
      titulo: new FormControl(this.titulo),
      fecha: new FormControl(this.fecha),
      procedencia: new FormControl(this.procedencia),
      movimiento1: new FormControl(this.movimiento1),
      movimiento2: new FormControl(this.movimiento2),
      destruccion: new FormControl(this.destruccion),
      expediente: new FormControl(this.expediente),
      observacion: new FormControl(this.observacion),
      imagen: new FormControl(this.no),
    });
    modal.componentInstance.modalHeader = "Documentos Limitados";
    modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
    modal.componentInstance.modal_action = "Editar";
    modal.componentInstance.form_document = form_document;
    modal.componentInstance.src_document = this.src_document;
    modal.result.then((result) => {
      if (result) {
        this.emisor.emit(true);
      }
    });
  }
}
