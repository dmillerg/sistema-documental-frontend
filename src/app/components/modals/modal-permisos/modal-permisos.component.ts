import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './../../../service/api.service';
import { Usuarios } from './../../../models/usuarios';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Roles } from 'src/app/models/roles';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-permisos',
  templateUrl: './modal-permisos.component.html',
  styleUrls: ['./modal-permisos.component.css']
})
export class ModalPermisosComponent implements OnInit {

  modal_action: string = "Agregar";
  modalHeader: string = '';
  modalmessage: string = '';
  actiModal: NgbActiveModal;

  hide: boolean = true;
  hide1: boolean = true;

  // Emitir contenido desde el modal al padre sin cerrarlo
  @Output() user: EventEmitter<any> = new EventEmitter();

  permisos = {
    is_all: false,
    is_edit: false,
    is_create: false,
    is_delete: false,
    is_read: false,
  }

  permisos_old = {
    is_all: false,
    is_edit: false,
    is_create: false,
    is_delete: false,
    is_read: false,
  };

  rol_name: string = 'root';
  rol_id: number = -1;
  disable_register: boolean = false;

  // toppingList: string[] = ['usuario', 'nombre', 'fecha de registro', 'hora de registro'];
  constructor(private activeModal: NgbActiveModal, private api: ApiService, private toastrService: ToastService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
    if (this.modal_action == "Editar") {
      this.permisos_old.is_all = this.permisos.is_all;
      this.permisos_old.is_edit = this.permisos.is_edit;
      this.permisos_old.is_create = this.permisos.is_create;
      this.permisos_old.is_delete = this.permisos.is_delete;
      this.permisos_old.is_read = this.permisos.is_read;
    }
  }

  /**
   * metodo al accionar el boton del modal
   * Agrega un usuario
   * Actualiza un usuario
   */
  ActionRol() {
    // Emitir contenido desde el modal al padre sin cerrarlo
    // this.user.emit(this.usuario);

    if (this.modal_action == "Asignar") {
      this.api.AddPermisos(this.permisos,this.rol_id).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.permisos);
        this.toastrService.success("Permisos asignados correctamente al rol "+this.rol_name,"Mensaje");
      },(error)=>{
        this.toastrService.error("Ocurrio un error al asignar los permisos " + error.error.message ,"Error");
      });
    } else {
      this.api.UpdatePermisos(this.permisos,this.rol_id).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.permisos);
        this.toastrService.success("Permisos actualizados correctamente al rol "+this.rol_name,"Mensaje");
      },(error)=>{
        this.toastrService.error("Ocurrio un error al actualizar los permisos " + error.error.message ,"Error");
      });
    }
  }

  /**
   * validar si ocurrio algun cambio en los campos del formulario
   * y si ocurrio, validar que el campo password y confirmacion sean iguales
   * y si ademas en caso de agregar ningun campo se encuentra vacio
   */
  validarCambio() {
    if (this.modal_action == 'Editar') {
      this.disable_register = !this.validarCambioFormulario();
    } else {
      this.disable_register = !this.validarCamposVacios();
    }
    console.log(!this.validarCamposVacios())
  }

  /**
   * valida si hubo un cambio en alguno de los campos del formulario
   * y si el campo password y el de confirmacion son iguales
   * @returns
   */
  validarCambioFormulario(): boolean {
    return (this.permisos_old.is_all != this.permisos.is_all || this.permisos_old.is_edit != this.permisos.is_edit || this.permisos_old.is_create != this.permisos.is_create || this.permisos_old.is_delete != this.permisos.is_delete ||this.permisos_old.is_read != this.permisos.is_read );
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    return true;
  }

  onChangeSelectFilter() {

  }

  allComplete() {
    this.permisos.is_edit = this.permisos.is_all;
    this.permisos.is_create = this.permisos.is_all;
    this.permisos.is_delete = this.permisos.is_all;
    this.permisos.is_read = this.permisos.is_all;
  }
}

