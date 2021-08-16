import { ApiService } from '../../../service/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document.component.html',
  styleUrls: ['./modal-document.component.css']
})
export class ModalDocumentComponent implements OnInit {

  uploadFiles: Array<File>;

  modal_action: string = "Agregar";
  modalHeader: string = '';
  modalmessage: string = '';
  actiModal: NgbActiveModal;

  hide: boolean = true;
  hide1: boolean = true;

  // Emitir contenido desde el modal al padre sin cerrarlo
  @Output() document: EventEmitter<any> = new EventEmitter();

  form_document = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    descripcion: new FormControl(''),
    imagen: new FormControl(''),
    date: new FormControl(''),
  });

  src_document = './../../.././../ctc.png';
  src = './../../.././../ctc.png';
  colorEstado = '#f00';

  form_document_past = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    descripcion: new FormControl(''),
    imagen: new FormControl(''),
    date: new FormControl(''),
  });

  disable_register: boolean = true;
  text_visibility: string = '';
  estado: boolean = false;
  estado_past: boolean = false;

  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
    if (this.modal_action == "Editar") {
      this.form_document_past.value.title = this.form_document.value.title;
      this.form_document_past.value.descripcion = this.form_document.value.descripcion;
      this.form_document_past.value.imagen = this.form_document.value.imagen;
      this.form_document_past.value.date = this.form_document.value.date;
      this.estado = this.estado;
    }
  }

  /**
   * metodo al accionar el boton del modal
   * Agrega un document
   * Actualiza un document
   */
  ActionDocument() {
    // Emitir contenido desde el modal al padre sin cerrarlo
    // this.user.emit(this.document);
    var date = new Date();
    this.form_document.value.date = formatDate(date, 'dd - MM - yyyy', 'en-US');
    let formData = new FormData();
    console.log("uploadFiles", this.uploadFiles);
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }
    formData.append("id", this.form_document.value.id);
    formData.append("title", this.form_document.value.title);
    formData.append("descripcion", this.form_document.value.descripcion);
    formData.append("imagen", this.form_document.value.imagen);
    formData.append("date", this.form_document.value.date);
    formData.append("estado", this.estado+'');
    console.log(this.estado);
    if (this.modal_action == "Agregar") {
      this.api.AddDocument(formData).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_document.value);
      });
    } else {
      this.api.updateDocument(this.form_document.value.id, formData).subscribe((result) => {
        // location.reload(true);
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_document.value);
      });


    }
  }

  /**
   * validar si ocurrio algun cambio en los campos del formulario
   * y si ocurrio, validar que el campo password y confirmacion sean iguales
   * y si ademas en caso de agregar ningun campo se encuentra vacio
   */
  validarCambio() {
    console.log("validar cambio", this.modal_action);
    if (this.modal_action == 'Editar') {
      this.disable_register = !this.validarCambioFormulario();
    } else {
      this.disable_register = !this.validarCamposVacios();
    }
  }

  /**
   * valida si hubo un cambio en alguno de los campos del formulario
   * y si el campo password y el de confirmacion son iguales
   * @returns
   */
  validarCambioFormulario(): boolean {
    console.log(this.form_document.value.estado);
    return (this.form_document_past.value.title != this.form_document.value.title ||
      this.form_document_past.value.descripcion != this.form_document.value.descripcion ||
      this.src != this.src_document ||
      this.form_document_past.value.date != this.form_document.value.date ||
      this.estado_past != this.estado);
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    return this.form_document.value.title != '' &&
      this.form_document.value.descripcion != '' &&
      (this.src_document != '' || this.src_document != this.src);
  }


  fileEvent(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    //  console.log(fileInput);
    this.uploadFiles = fileInput.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      this.src_document = reader.result as string;
    }
    reader.readAsDataURL(file);
  }


  onChangeSelectFilter() {
    //     this.rol_usuario.setValue(this.r);
    // console.log(this.rol_usuario.value)
  }

  changeImage() {
    document.getElementById("imagefile").click();
  }

  deleteImage() {
    this.src_document = undefined;
  }

  visibilidadChange() {
    console.log("visibilidad change");
    this.estado = !this.estado;
    console.log(this.estado);
    if (this.estado) {
      this.text_visibility = 'privado';
    } else {
      this.text_visibility = 'publico';
    }
    this.validarCambio();
  }
}
