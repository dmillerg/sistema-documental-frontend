import { FormGroup, FormControl } from '@angular/forms';
import { ModalDocumentClasificadoComponent } from './../../../../modals/modal-document-clasificado/modal-document-clasificado.component';
import { ModalDeleteComponent } from './../../../../modals/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../../../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-documentos-clasificados-item',
  templateUrl: './documentos-clasificados-item.component.html',
  styleUrls: ['./documentos-clasificados-item.component.css']
})
export class DocumentosClasificadosItemComponent implements OnInit {

  @Input() id: number = -1;
  @Input() src_document: string = 'ctc.png';
  @Input() no: string = '';
  @Input() fecha: string = '';
  @Input() enviado: string = '';
  @Input() rsb: string = '';
  @Input() rs: string = '';
  @Input() fecha_registro_ctc: string = '';
  @Input() asunto: string = '';
  @Input() doc: string = '';
  @Input() ej: string = '';
  @Input() clasif: string = '';
  @Input() destino: string = '';
  @Input() traslado: string = '';
  @Input() fecha_traslado: string = '';
  @Output() emisor: EventEmitter<boolean> = new EventEmitter();
  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.api.getDocumentsClasificadoFoto(this.id).subscribe((result) => {
      this.src_document = result + '';
    }, (error) => {
      this.src_document = error.url;
    })
  }

  deleteDocument() {
    var modal = this.modalService.open(ModalDeleteComponent);
    modal.componentInstance.modalHeader = "Documento Clasificado";
    modal.componentInstance.id = this.id;
    modal.result.then((result) => {
      if (result) {
        this.emisor.emit(true);
      }
    });
  }

  updateDocument() {
    const modal = this.modalService.open(ModalDocumentClasificadoComponent, { backdrop: false });
    let form_document = new FormGroup({
      id: new FormControl(this.id),
      no: new FormControl(this.no),
      fecha: new FormControl(this.fecha),
      enviado: new FormControl(this.enviado),
      rsb: new FormControl(this.rsb),
      rs: new FormControl(this.rs),
      fecha_registro_ctc: new FormControl(this.fecha_registro_ctc),
      asunto: new FormControl(this.asunto),
      doc: new FormControl(this.doc),
      ej: new FormControl(this.ej),
      clasif: new FormControl(this.clasif),
      destino: new FormControl(this.destino),
      traslado: new FormControl(this.traslado),
      fecha_traslado: new FormControl(this.fecha_traslado),
    });
    modal.componentInstance.modalHeader = "Documentos Clasificados";
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
