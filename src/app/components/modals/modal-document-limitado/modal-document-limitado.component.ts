import { ApiService } from '../../../service/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-document',
  templateUrl: './modal-document-limitado.component.html',
  styleUrls: ['./modal-document-limitado.component.css']
})
export class ModalDocumentLimitadoComponent implements OnInit {

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
    titulo: new FormControl(''),
    fecha: new FormControl(''),
    procedencia: new FormControl(''),
    movimiento1: new FormControl(''),
    movimiento2: new FormControl(''),
    destruccion: new FormControl(''),
    expediente: new FormControl(''),
    observacion: new FormControl(''),
  });

  src_document = 'ctc.png';
  src = 'ctc.png';
  colorEstado = '#f00';

  form_document_past = new FormGroup({
    id: new FormControl(''),
    no: new FormControl(''),
    titulo: new FormControl(''),
    fecha: new FormControl(''),
    procedencia: new FormControl(''),
    movimiento1: new FormControl(''),
    movimiento2: new FormControl(''),
    destruccion: new FormControl(''),
    expediente: new FormControl(''),
    observacion: new FormControl(''),
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
      this.form_document_past.value.titulo = this.form_document.value.titulo;
      this.form_document_past.value.fecha = this.form_document.value.fecha;
      this.form_document_past.value.procedencia = this.form_document.value.procedencia;
      this.form_document_past.value.movimiento1 = this.form_document.value.movimiento1;
      this.form_document_past.value.movimiento2 = this.form_document.value.movimiento2;
      this.form_document_past.value.destruccion = this.form_document.value.destruccion;
      this.form_document_past.value.expediente = this.form_document.value.expediente;
      this.form_document_past.value.observacion = this.form_document.value.observacion;
      this.form_document_past.value.imagen = this.form_document.value.imagen;
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
    this.form_document.value.fecha = formatDate(this.form_document.value.fecha, 'yyyy-MM-dd', 'en-US');
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
    formData.append("titulo", this.form_document.value.titulo);
    formData.append("fecha", this.form_document.value.fecha);
    formData.append("procedencia", this.form_document.value.procedencia);
    formData.append("movimiento1", this.form_document.value.movimiento1);
    formData.append("movimiento2", this.form_document.value.movimiento2);
    formData.append("destruccion", this.form_document.value.destruccion);
    formData.append("expediente", this.form_document.value.expediente);
    formData.append("observacion", this.form_document.value.observacion);
    formData.append("imagen", this.form_document.value.imagen);
    console.log(this.estado);
    if (this.modal_action == "Agregar") {
      this.api.AddDocumentlimit(formData).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_document.value);
        this.toastrService.success("El documento se añadio correctamente", "Mensaje");
      }, (error) => {
        this.toastrService.error(error.error.message, "Error");
      });
    } else {
      this.api.updateDocumentLimit(this.form_document.value.id, formData).subscribe((result) => {
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
    // console.log("validar cambio", this.modal_action);
    // let dateString = '02/05/2020';
    // let momentVariable = moment(dateString, 'MM-DD-YYYY');
    // let stringvalue = momentVariable.format('YYYY-MM-DD');
    // console.log(stringvalue);
    // console.log("fecha    ", this.form_document.value.fecha)
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
    console.log(this.form_document.value.estado);
    return (this.form_document_past.value.titulo != this.form_document.value.titulo ||
      this.form_document_past.value.fecha != this.form_document.value.fecha ||
      this.form_document_past.value.no != this.form_document.value.no ||
      this.src != this.src_document ||
      this.form_document_past.value.procedencia != this.form_document.value.procedencia ||
      this.form_document_past.value.movimiento1 != this.form_document.value.movimiento1 ||
      this.form_document_past.value.movimiento2 != this.form_document.value.movimiento2 ||
      this.form_document_past.value.destruccion != this.form_document.value.destruccion ||
      this.form_document_past.value.expediente != this.form_document.value.expediente ||
      this.form_document_past.value.observacion != this.form_document.value.observacion);
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    return this.form_document.value.titulo != '' &&
      this.form_document.value.fecha != '' &&
      this.form_document.value.procedencia != '' &&
      this.form_document.value.movimiento1 != '' &&
      this.form_document.value.movimiento2 != '' &&
      this.form_document.value.destruccion != '' &&
      this.form_document.value.expediente != '' &&
      this.form_document.value.observacion != '' &&
      this.form_document.value.no != '' &&
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
