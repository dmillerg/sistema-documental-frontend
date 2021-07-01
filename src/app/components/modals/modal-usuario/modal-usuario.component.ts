import { Roles } from 'src/app/models/roles';
import { ApiService } from './../../../service/api.service';
import { Usuarios } from './../../../models/usuarios';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  uploadFiles: Array<File>;

  modal_action: string = "Agregar";
  modalHeader: string = '';
  modalmessage: string = '';
  actiModal: NgbActiveModal;

  hide: boolean = true;
  hide1: boolean = true;

  // Emitir contenido desde el modal al padre sin cerrarlo
  @Output() user: EventEmitter<any> = new EventEmitter();


  form_user = new FormGroup({
    id: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
    full_name: new FormControl(''),
    register_date: new FormControl(''),
    register_hour: new FormControl(''),
    avatar: new FormControl(''),
    rol_usuario: new FormControl(''),
    confirm: new FormControl('')
  });

  src_avatar;
  colorEstado = '#f00';

  form_user_past = new FormGroup({
    id: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
    full_name: new FormControl(''),
    register_date: new FormControl(''),
    register_hour: new FormControl(''),
    avatar: new FormControl(''),
    rol_usuario: new FormControl('')
  });


  valid: boolean = false;
  disable_register = true;

  roles;

  rol_usuario_old: Roles[];
  // toppingList: string[] = ['usuario', 'nombre', 'fecha de registro', 'hora de registro'];

  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
    if (this.modal_action == "Editar") {
      this.form_user.value.confirm = this.form_user.value.password;
      this.form_user_past.value.user = this.form_user.value.user;
      this.form_user_past.value.password = this.form_user.value.password;
      this.form_user_past.value.full_name = this.form_user.value.full_name;
      this.api.getAvatarUser(this.form_user.value.id).subscribe((result) => {
        this.src_avatar = result;
      }, (error) => {
        this.src_avatar = error.url;
      });
      // this.api.ObtenerRolesByUser(this.form_user.value).subscribe((result) => {
      //   this.form_user.value.rol_usuario.setValue(result);

      // });
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
      this.form_user.value.register_date = formatDate(date, 'dd - MM - yyyy', 'en-US');
      this.form_user.value.register_hour = formatDate(date, 'HH:mm aa', 'en-Us');
      let formData = new FormData();
      console.log("uploadFiles", this.uploadFiles);
      if (this.uploadFiles != undefined) {
        for (let i = 0; i < this.uploadFiles.length; i++) {
          formData.append("avatar", this.uploadFiles[i], this.uploadFiles[i].name);
        }
      }
      formData.append("id", this.form_user.value.id);
      formData.append("user", this.form_user.value.user);
      formData.append("password", this.form_user.value.password);
      formData.append("full_name", this.form_user.value.full_name);
      formData.append("register_date", this.form_user.value.register_date);
      formData.append("register_hour", this.form_user.value.register_hour);
      formData.append("roles", JSON.stringify(this.form_user.value.rol_usuario));
      this.api.AddUsuario(formData).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_user.value);
      });
    } else {
      let formData = new FormData();
      if (this.uploadFiles != undefined) {
        for (let i = 0; i < this.uploadFiles.length; i++) {
          formData.append("avatar", this.uploadFiles[i], this.uploadFiles[i].name);
        }
      }
      formData.append("id", this.form_user.value.id);
      formData.append("user", this.form_user.value.user);
      formData.append("password", this.form_user.value.password);
      formData.append("full_name", this.form_user.value.full_name);
      formData.append("register_date", this.form_user.value.register_date);
      formData.append("register_hour", this.form_user.value.register_hour);
      formData.append("roles", JSON.stringify(this.form_user.value.rol_usuario));
      this.api.deleteAvatarUser(this.form_user.value.id).subscribe((result)=>{
        this.api.UpdateUsuario(formData, this.form_user.value.id).subscribe((result) => {
          // Emitir contenido desde el modal al padre al cerrarlo
          this.activeModal.close(this.form_user.value);
        });
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
    return (this.form_user_past.value.user != this.form_user.value.user || this.form_user_past.value.password != this.form_user.value.password || this.form_user_past.value.full_name != this.form_user.value.full_name || this.form_user_past.value.register_date != this.form_user.value.register_date || this.form_user.value.rol_usuario != this.rol_usuario_old) && this.form_user.value.password == this.form_user.value.confirm;
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    return this.form_user.value.user != '' && this.form_user.value.password != '' && this.form_user.value.full_name != '' && this.validarConfirmacion();
  }

  /**
   * valida que el campo password y confirmacion sean iguales
   * @returns
   */
  validarConfirmacion(): boolean {
    return this.form_user.value.password == this.form_user.value.confirm;
  }

  fileEvent(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    //  console.log(fileInput);
    this.uploadFiles = fileInput.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      this.src_avatar = reader.result as string;
    }
    reader.readAsDataURL(file);
  }


  onChangeSelectFilter() {
    //     this.rol_usuario.setValue(this.r);
    // console.log(this.rol_usuario.value)
  }

  changeImage(){
    document.getElementById("imagefile").click();
  }

  deleteImage(){
    this.src_avatar=undefined;
  }
}
