import { Roles } from 'src/app/models/roles';
import { ApiService } from './../../../service/api.service';
import { Usuarios } from './../../../models/usuarios';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  modal_action: string = "Agregar";
  modalHeader: string = '';
  modalmessage: string = '';
  actiModal: NgbActiveModal;

  hide: boolean = true;
  hide1: boolean = true;

  // Emitir contenido desde el modal al padre sin cerrarlo
  @Output() user: EventEmitter<any> = new EventEmitter();

  usuario: Usuarios = {
    id: null,
    user: '',
    password: '',
    full_name: '',
    register_date: '',
    register_hour: ''
  }
  confirm: string = '';

  usuario_past: Usuarios = {
    id: null,
    user: '',
    password: '',
    full_name: '',
    register_date: '',
    register_hour: ''
  };

  valid: boolean = false;
  disable_register = true;

  roles;
  rol_usuario: Roles[];
  rol_usuario_old: Roles[];
  // toppingList: string[] = ['usuario', 'nombre', 'fecha de registro', 'hora de registro'];

  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
    if (this.modal_action == "Editar") {
      this.confirm = this.usuario.password;
      this.usuario_past.user = this.usuario.user;
      this.usuario_past.password = this.usuario.password;
      this.usuario_past.full_name = this.usuario.full_name;
      this.api.ObtenerRolesByUser(this.usuario.id).subscribe((result) => {
        this.rol_usuario = result;
        for(let r of result){

        }
      });
    }
    this.api.ObtenerRoles().subscribe((result) => {
      this.roles = result;
    });


  }

  /**
   * metodo al accionar el boton del modal
   * Agrega un usuario
   * Actualiza un usuario
   */
  ActionUsuario() {
    // Emitir contenido desde el modal al padre sin cerrarlo
    // this.user.emit(this.usuario);

    if (this.modal_action == "Agregar") {
      var date = new Date();
      this.usuario.register_date = formatDate(date, 'dd - MM - yyyy', 'en-US');
      this.usuario.register_hour = formatDate(date, 'HH:mm aa', 'en-Us');
      this.api.AddUsuario(this.usuario, this.rol_usuario).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.usuario);
      });
    } else {
      this.api.UpdateUsuario(this.usuario, this.rol_usuario).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.usuario);
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
      this.valid = !this.validarConfirmacion();
    } else {
      this.disable_register = !this.validarCamposVacios();
      this.valid = !this.validarConfirmacion();
    }
  }

  /**
   * valida si hubo un cambio en alguno de los campos del formulario
   * y si el campo password y el de confirmacion son iguales
   * @returns
   */
  validarCambioFormulario(): boolean {
    return (this.usuario_past.user != this.usuario.user || this.usuario_past.password != this.usuario.password || this.usuario_past.full_name != this.usuario.full_name || this.usuario_past.register_date != this.usuario.register_date || this.rol_usuario !=this.rol_usuario_old) && this.usuario.password == this.confirm;
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    return this.usuario.user != '' && this.usuario.password != '' && this.usuario.full_name != '' && this.validarConfirmacion();
  }

  /**
   * valida que el campo password y confirmacion sean iguales
   * @returns
   */
  validarConfirmacion(): boolean {
    return this.usuario.password == this.confirm;
  }


  onChangeSelectFilter() {
//     this.rol_usuario.setValue(this.r);
// console.log(this.rol_usuario.value)
  }
}
