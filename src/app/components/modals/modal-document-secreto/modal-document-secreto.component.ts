import { ApiService } from '../../../service/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document-secreto.component.html',
  styleUrls: ['./modal-document-secreto.component.css']
})
export class ModalDocumentSecretoComponent implements OnInit {

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
    no: new FormControl(''),
    lugar: new FormControl(''),
    reg_no: new FormControl(''),
    titulo: new FormControl(''),
    categoria: new FormControl(''),
    mat_no: new FormControl(''),
    folio_no: new FormControl(''),
    cant: new FormControl(''),
    no_ejemplar: new FormControl(''),
    cant_hojas: new FormControl(''),
    destruccion: new FormControl(''),
    destino: new FormControl(''),
    comp: new FormControl(''),
    imagen: new FormControl(''),
  });

  src_document = 'ctc.png';
  src = 'ctc.png';
  colorEstado = '#f00';

  form_document_past = new FormGroup({
    id: new FormControl(''),
    no: new FormControl(''),
    lugar: new FormControl(''),
    reg_no: new FormControl(''),
    titulo: new FormControl(''),
    categoria: new FormControl(''),
    mat_no: new FormControl(''),
    folio_no: new FormControl(''),
    cant: new FormControl(''),
    no_ejemplar: new FormControl(''),
    cant_hojas: new FormControl(''),
    destruccion: new FormControl(''),
    destino: new FormControl(''),
    comp: new FormControl(''),
    imagen: new FormControl(''),
  });

  disable_register: boolean = true;
  text_visibility: string = '';
  estado: boolean = false;
  estado_past: boolean = false;

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private toastrService: ToastService, private datepipe: DatePipe) {
    this.actiModal = this.activeModal;
  }

  ngOnInit(): void {
    if (this.modal_action == "Editar") {
      this.form_document_past.value.no = this.form_document.value.no;
      this.form_document_past.value.lugar = this.form_document.value.lugar;
      this.form_document_past.value.reg_no = this.form_document.value.reg_no;
      this.form_document_past.value.titulo = this.form_document.value.titulo;
      this.form_document_past.value.categoria = this.form_document.value.categoria;
      this.form_document_past.value.mat_no = this.form_document.value.mat_no;
      this.form_document_past.value.folio_no = this.form_document.value.folio_no;
      this.form_document_past.value.cant = this.form_document.value.cant;
      this.form_document_past.value.no_ejemplar = this.form_document.value.no_ejemplar;
      this.form_document_past.value.cant_hojas = this.form_document.value.cant_hojas;
      this.form_document_past.value.destruccion = this.form_document.value.destruccion;
      this.form_document_past.value.destino = this.form_document.value.destino;
      this.form_document_past.value.comp = this.form_document.value.comp;
      this.form_document_past.value.imagen = this.form_document.value.imagen;
      console.log(this.form_document.value.destruccion)
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
    // this.form_document.value.fecha = formatDate(this.form_document.value.fecha, 'yyyy-MM-dd', 'en-US');
    let formData = new FormData();
    console.log("uploadFiles", this.uploadFiles);
    if (this.uploadFiles != undefined) {
      for (let i = 0; i < this.uploadFiles.length; i++) {
        formData.append("foto", this.uploadFiles[i], this.uploadFiles[i].name);
      }
    }
    console.log(this.datepipe.transform(this.form_document.value.fecha, 'yyyy-MM-dd'));
    formData.append("id", this.form_document.value.id);
    formData.append("no", this.form_document.value.no);
    formData.append("lugar", this.form_document.value.lugar);
    formData.append("reg_no", this.form_document.value.reg_no);
    formData.append("titulo", this.form_document.value.titulo);
    formData.append("categoria", this.form_document.value.categoria);
    formData.append("mat_no", this.form_document.value.mat_no);
    formData.append("folio_no", this.form_document.value.folio_no);
    formData.append("cant", this.form_document.value.cant);
    formData.append("no_ejemplar", this.form_document.value.no_ejemplar);
    formData.append("cant_hojas", this.form_document.value.cant_hojas);
    formData.append("destruccion", this.form_document.value.destruccion);
    formData.append("destino", this.form_document.value.destino);
    formData.append("comp", this.form_document.value.comp);
    formData.append("imagen", this.form_document.value.imagen);

    if (this.modal_action == "Agregar") {
      this.api.AddDocumentSecret(formData).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_document.value);
        this.toastrService.success("El documento se añadio correctamente", "Mensaje");
      }, (error) => {
        this.toastrService.error(error.error.message, "Error");
      });
    } else {
      this.api.updateDocumentSecret(this.form_document.value.id, formData).subscribe((result) => {
        // location.reload(true);
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_document.value);
        this.toastrService.success("El documento se actualizo correctamente", "Mensaje");
      }, (error) => {
        this.toastrService.error(error.error.message, "Error");
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
  }

  /**
   * valida si hubo un cambio en alguno de los campos del formulario
   * @returns
   */
  validarCambioFormulario(): boolean {
    return (this.form_document_past.value.no != this.form_document.value.no ||
      this.form_document_past.value.lugar != this.form_document.value.lugar ||
      this.form_document_past.value.reg_no != this.form_document.value.reg_no ||
      this.src != this.src_document ||
      this.form_document_past.value.titulo != this.form_document.value.titulo ||
      this.form_document_past.value.categoria != this.form_document.value.categoria ||
      this.form_document_past.value.mat_no != this.form_document.value.mat_no ||
      this.form_document_past.value.folio_no != this.form_document.value.folio_no ||
      this.form_document_past.value.cant != this.form_document.value.cant ||
      this.form_document_past.value.no_ejemplar != this.form_document.value.no_ejemplar ||
      this.form_document_past.value.cant_hojas != this.form_document.value.cant_hojas ||
      this.form_document_past.value.destruccion != this.form_document.value.destruccion ||
      this.form_document_past.value.destino != this.form_document.value.destino ||
      this.form_document_past.value.comp != this.form_document.value.comp);
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    return this.form_document.value.no != '' &&
      this.form_document.value.lugar != '' &&
      this.form_document.value.reg_no != '' &&
      this.form_document.value.titulo != '' &&
      this.form_document.value.categoria != '' &&
      this.form_document.value.mat_no != '' &&
      this.form_document.value.folio_no != '' &&
      this.form_document.value.cant != '' &&
      this.form_document.value.no_ejemplar != '' &&
      this.form_document.value.cant_hojas != '' &&
      this.form_document.value.destruccion != '' &&
      this.form_document.value.destino != '' &&
      this.form_document.value.comp != '' &&
      (this.src_document != '' ||
        this.src_document != this.src);
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

}
