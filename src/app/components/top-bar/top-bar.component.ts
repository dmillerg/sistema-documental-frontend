import { ModalDocumentClasificadoComponent } from './../modals/modal-document-clasificado/modal-document-clasificado.component';
import { ModalDocumentLimitadoComponent } from './../modals/modal-document-limitado/modal-document-limitado.component';
import { ModalDocumentComponent } from './../modals/modal-document/modal-document.component';
import { ModalPermisosComponent } from './../modals/modal-permisos/modal-permisos.component';
import { ModalRolComponent } from './../modals/modal-rol/modal-rol.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalUsuarioComponent } from '../modals/modal-usuario/modal-usuario.component';
import { ModalDocumentSecretoComponent } from '../modals/modal-document-secreto/modal-document-secreto.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() modal_icon = 'build';
  @Input() modal_subheader = 'Subtitle';
  @Input() modal_header: string = "title";
  @Input() withAddButton: boolean = true;

  @Output() emisor: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  openModal() {
    console.log(this.modal_header);
    switch (this.modal_header) {
      case "Usuario":
        var modal = this.modalService.open(ModalUsuarioComponent);
        modal.componentInstance.modalHeader = "Nuevo usuario";
        modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
        modal.componentInstance.modal_action = "Agregar";
        // Emitir desde el modal contenido de este al cerrarlo
        modal.result.then((result) => {
          if (result) {
            this.registerOrUpdate();
          }
        });
        break;
      case "Roles":
        var modal = this.modalService.open(ModalRolComponent);
        modal.componentInstance.modalHeader = "Nuevo Rol";
        modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
        modal.componentInstance.modal_action = "Agregar";
        // Emitir desde el modal contenido de este al cerrarlo
        modal.result.then((result) => {
          if (result) {
            this.registerOrUpdate();
          }
        });
        break;
      case "Permisos":
        var modal = this.modalService.open(ModalPermisosComponent);
        modal.componentInstance.modalHeader = "permisos";
        modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
        modal.componentInstance.modal_action = "Asignar";
        // Emitir desde el modal contenido de este al cerrarlo
        modal.result.then((result) => {
          if (result) {
            this.registerOrUpdate();
          }
        });
        break;
      case 'Documentos Secretos':
        var modal = this.modalService.open(ModalDocumentSecretoComponent, { backdrop: false });
        modal.componentInstance.modalHeader = "Documentos Secretos";
        modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
        modal.componentInstance.modal_action = "Agregar";
        modal.result.then((result) => {
          if (result) {
            this.registerOrUpdate();
          }
        });
        break;
      case 'Documentos Limitados':
        var modal = this.modalService.open(ModalDocumentLimitadoComponent, { backdrop: false });
        modal.componentInstance.modalHeader = "Documentos limitados";
        modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
        modal.componentInstance.modal_action = "Agregar";
        modal.result.then((result) => {
          if (result) {
            this.registerOrUpdate();
          }
        });
        break;
      case 'Documentos Clasificados':
        var modal = this.modalService.open(ModalDocumentClasificadoComponent, { backdrop: false });
        modal.componentInstance.modalHeader = "Documentos clasificados";
        modal.componentInstance.modalmessage = "Se debe rellenar todos los campos marcados con un asterisco";
        modal.componentInstance.modal_action = "Agregar";
        modal.result.then((result) => {
          if (result) {
            this.registerOrUpdate();
          }
        });
        break;
      default:
        console.log("default");
    }
  }

  registerOrUpdate() {
    this.emisor.emit(true);
  }

}
