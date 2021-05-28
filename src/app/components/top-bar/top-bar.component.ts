import { ModalPermisosComponent } from './../modals/modal-permisos/modal-permisos.component';
import { ModalRolComponent } from './../modals/modal-rol/modal-rol.component';
import { ModalDocumentsComponent } from './../modals/modal-documents/modal-documents.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalUsuarioComponent } from '../modals/modal-usuario/modal-usuario.component';

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
      default:
        console.log("default");
    }
  }

  registerOrUpdate() {
    this.emisor.emit(true);
  }

}
