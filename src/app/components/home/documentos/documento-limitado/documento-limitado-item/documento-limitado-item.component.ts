import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() asunto: string = '';
  @Input() no: number = -1;
  @Output() emisor: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  deleteDocument() {
    // var modal = this.modalService.open(ModalDeleteComponent);
    // modal.componentInstance.modalHeader = "Documento";
    // modal.componentInstance.id = this.id;
    // modal.result.then((result) => {
    //   if (result) {
    //     this.emisor.emit(true);
    //   }
    // });
  }

  updateDocument() {
    // const modal = this.modalService.open(ModalDocumentComponent, { size: 'sm' });
    // let form_document = new FormGroup({
    //   id: new FormControl(this.id),
    //   title: new FormControl(this.title),
    //   descripcion: new FormControl(this.description),
    //   imagen: new FormControl(this.title + '.jpg'),
    //   date: new FormControl(this.date),
    // });
    // modal.componentInstance.modalHeader = "documentos";
    // modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
    // modal.componentInstance.modal_action = "Editar";
    // modal.componentInstance.form_document = form_document;
    // modal.componentInstance.src_document = this.src_document;
    // modal.componentInstance.estado = this.estado;
    // modal.result.then((result) => {
    //   if (result) {
    //     this.emisor.emit(true);
    //   }
    // });
  }
}
