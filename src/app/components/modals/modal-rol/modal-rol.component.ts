import { ApiService } from './../../../service/api.service';
import { Usuarios } from './../../../models/usuarios';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Roles } from 'src/app/models/roles';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.css']
})
export class ModalRolComponent implements OnInit {

  modal_action: string = "Agregar";
  modalHeader: string = '';
  modalmessage: string = '';
  actiModal: NgbActiveModal;

  hide: boolean = true;
  hide1: boolean = true;

  // Emitir contenido desde el modal al padre sin cerrarlo
  @Output() user: EventEmitter<any> = new EventEmitter();

  rol: Roles = {
    id: null,
    rol_name: '',
    description: ''
  }

  rol_past: Roles = {
    id: null,
    rol_name: '',
    description: ''
  };
  id: number = null;
  disable_register = true;
  rol_name = '';
  description_model = '';
  rol_name_old = '';
  description_old = '';

  // toppingList: string[] = ['usuario', 'nombre', 'fecha de registro', 'hora de registro'];
  constructor(private activeModal: NgbActiveModal, private api: ApiService,private toastrService: ToastService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
    if (this.modal_action == "Editar") {
      this.rol_name_old = this.rol_name;
      this.description_old = this.description_model;
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
    this.rol.id = this.id;
    this.rol.rol_name = this.rol_name;
    this.rol.description = this.description_model;
    if (this.modal_action == "Agregar") {
      this.api.AddRol(this.rol).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.rol);
        this.toastrService.success("Rol creado satisfactoriamente "+this.rol_name,"Mensaje");
      },(error)=>{
        this.toastrService.error("Ocurrio un error al crear el rol: " + error.error.message ,"Error");
      });
    } else {
      this.api.UpdateRol(this.rol).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.rol);
        this.toastrService.success("Rol actualizado satisfactoriamente "+this.rol_name,"Mensaje");
      },(error)=>{
        this.toastrService.error("Ocurrio un error al actualizar el rol: " + error.error.message ,"Error");
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
    return (this.rol_name_old != this.rol_name || this.description_old != this.description_model);
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    console.log('rol_name ', this.rol_name);
    console.log('description ', this.description_model);
    return this.rol_name != '' && this.description_model != '';
  }

  onChangeSelectFilter() {

  }
}
