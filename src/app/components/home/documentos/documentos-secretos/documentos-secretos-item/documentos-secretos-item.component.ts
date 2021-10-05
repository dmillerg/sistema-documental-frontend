import { FormGroup, FormControl } from '@angular/forms';
import { ModalDeleteComponent } from './../../../../modals/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../../../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDocumentSecretoComponent } from 'src/app/components/modals/modal-document-secreto/modal-document-secreto.component';

@Component({
  selector: 'app-documentos-secretos-item',
  templateUrl: './documentos-secretos-item.component.html',
  styleUrls: ['./documentos-secretos-item.component.css']
})
export class DocumentosSecretosItemComponent implements OnInit {

  @Input() id: number = -1;
  @Input() src_document: string = 'ctc.png';
  @Input() no: string = '';
  @Input() lugar: string = '';
  @Input() reg_no: string = '';
  @Input() titulo: string = '';
  @Input() categoria: string = '';
  @Input() mat_no: string = '';
  @Input() folio_no: string = '';
  @Input() cant: string = '';
  @Input() no_ejemplar: string = '';
  @Input() cant_hojas: string = '';
  @Input() destruccion: string = '';
  @Input() destino: string = '';
  @Input() comp: string = '';
  @Output() emisor: EventEmitter<boolean> = new EventEmitter();
  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.destruccion);
    this.api.getDocumentsSecretFoto(this.id).subscribe((result) => {
      this.src_document = result + '';
    }, (error) => {
      this.src_document = error.url;
    })
  }

  deleteDocument() {
    var modal = this.modalService.open(ModalDeleteComponent);
    modal.componentInstance.modalHeader = "Documento Secreto";
    modal.componentInstance.id = this.id;
    modal.result.then((result) => {
      if (result) {
        this.emisor.emit(true);
      }
    });
  }

  updateDocument() {
    const modal = this.modalService.open(ModalDocumentSecretoComponent, { backdrop: false });
    let form_document = new FormGroup({
      id: new FormControl(this.id),
      no: new FormControl(this.no),
      lugar: new FormControl(this.lugar),
      reg_no: new FormControl(this.reg_no),
      titulo: new FormControl(this.titulo),
      categoria: new FormControl(this.categoria),
      mat_no: new FormControl(this.mat_no),
      folio_no: new FormControl(this.folio_no),
      cant: new FormControl(this.cant),
      no_ejemplar: new FormControl(this.no_ejemplar),
      cant_hojas: new FormControl(this.cant_hojas),
      destruccion: new FormControl(this.destruccion),
      destino: new FormControl(this.destino),
      comp: new FormControl(this.comp),
      imagen: new FormControl(this.no),
    });
    modal.componentInstance.modalHeader = "Documentos Secretos";
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

