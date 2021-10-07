import { ApiService } from '../../../service/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-document-clasificado',
  templateUrl: './modal-document-clasificado.component.html',
  styleUrls: ['./modal-document-clasificado.component.css']
})
export class ModalDocumentClasificadoComponent implements OnInit {

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
    fecha: new FormControl(''),
    enviado: new FormControl(''),
    rsb: new FormControl(''),
    rs: new FormControl(''),
    fecha_registro_ctc: new FormControl(''),
    asunto: new FormControl(''),
    doc: new FormControl(''),
    ej: new FormControl(''),
    clasif: new FormControl(''),
    destino: new FormControl(''),
    traslado: new FormControl(''),
    fecha_traslado: new FormControl(''),
    imagen: new FormControl(''),
  });

  src_document = 'ctc.png';
  src = 'ctc.png';
  colorEstado = '#f00';

  form_document_past = new FormGroup({
    id: new FormControl(''),
    no: new FormControl(''),
    fecha: new FormControl(''),
    enviado: new FormControl(''),
    rsb: new FormControl(''),
    rs: new FormControl(''),
    fecha_registro_ctc: new FormControl(''),
    asunto: new FormControl(''),
    doc: new FormControl(''),
    ej: new FormControl(''),
    clasif: new FormControl(''),
    destino: new FormControl(''),
    traslado: new FormControl(''),
    fecha_traslado: new FormControl(''),
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
      this.form_document_past.value.fecha = this.form_document.value.fecha;
      this.form_document_past.value.enviado = this.form_document.value.enviado;
      this.form_document_past.value.rsb = this.form_document.value.rsb;
      this.form_document_past.value.rs = this.form_document.value.rs;
      this.form_document_past.value.fecha_registro_ctc = this.form_document.value.fecha_registro_ctc;
      this.form_document_past.value.asunto = this.form_document.value.asunto;
      this.form_document_past.value.doc = this.form_document.value.doc;
      this.form_document_past.value.ej = this.form_document.value.ej;
      this.form_document_past.value.clasif = this.form_document.value.clasif;
      this.form_document_past.value.destino = this.form_document.value.destino;
      this.form_document_past.value.traslado = this.form_document.value.traslado;
      this.form_document_past.value.fecha_traslado = this.form_document.value.fecha_traslado;
      this.form_document_past.value.imagen = this.form_document.value.imagen;
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
    this.form_document.value.fecha = formatDate(this.form_document.value.fecha, 'yyyy-MM-dd', 'en-US');
    this.form_document.value.fecha_registro_ctc = formatDate(this.form_document.value.fecha_registro_ctc, 'yyyy-MM-dd', 'en-US');
    this.form_document.value.fecha_traslado = formatDate(this.form_document.value.fecha_traslado, 'yyyy-MM-dd', 'en-US');
    console.log(this.datepipe.transform(this.form_document.value.fecha, 'yyyy-MM-dd'));
    console.log(this.datepipe.transform(this.form_document.value.fecha_registro_ctc, 'yyyy-MM-dd'));
    console.log(this.datepipe.transform(this.form_document.value.fecha_traslado, 'yyyy-MM-dd'));
    formData.append("id", this.form_document.value.id);
    formData.append("no", this.form_document.value.no);
    formData.append("fecha", this.datepipe.transform(this.form_document.value.fecha, 'yyyy-MM-dd'));
    formData.append("enviado", this.form_document.value.enviado);
    formData.append("rsb", this.form_document.value.rsb);
    formData.append("rs", this.form_document.value.rs);
    formData.append("fecha_registro_ctc", this.datepipe.transform(this.form_document.value.fecha_registro_ctc, 'yyyy-MM-dd'));
    formData.append("asunto", this.form_document.value.asunto);
    formData.append("doc", this.form_document.value.doc);
    formData.append("ej", this.form_document.value.ej);
    formData.append("clasif", this.form_document.value.clasif);
    formData.append("destino", this.form_document.value.destino);
    formData.append("traslado", this.form_document.value.traslado);
    formData.append("fecha_traslado", this.datepipe.transform(this.form_document.value.fecha_traslado, 'yyyy-MM-dd'));
    formData.append("imagen", this.form_document.value.imagen);

    if (this.modal_action == "Agregar") {
      this.api.AddDocumentClasificado(formData).subscribe((result) => {
        // Emitir contenido desde el modal al padre al cerrarlo
        this.activeModal.close(this.form_document.value);
        this.toastrService.success("El documento se añadio correctamente", "Mensaje");
      }, (error) => {
        this.toastrService.error(error.error.message, "Error");
      });
    } else {
      this.api.updateDocumentClasificado(this.form_document.value.id, formData).subscribe((result) => {
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
      this.form_document_past.value.fecha != this.form_document.value.fecha ||
      this.form_document_past.value.enviado != this.form_document.value.enviado ||
      this.src != this.src_document ||
      this.form_document_past.value.rsb != this.form_document.value.rsb ||
      this.form_document_past.value.rs != this.form_document.value.rs ||
      this.form_document_past.value.fecha_registro_ctc != this.form_document.value.fecha_registro_ctc ||
      this.form_document_past.value.asunto != this.form_document.value.asunto ||
      this.form_document_past.value.doc != this.form_document.value.doc ||
      this.form_document_past.value.ej != this.form_document.value.ej ||
      this.form_document_past.value.clasif != this.form_document.value.clasif ||
      this.form_document_past.value.destino != this.form_document.value.destino ||
      this.form_document_past.value.traslado != this.form_document.value.traslado ||
      this.form_document_past.value.fecha_traslado != this.form_document.value.fecha_traslado);
  }

  /**
   * valida que ninguno de los campos estan vacios
   * @returns
   */
  validarCamposVacios(): boolean {
    console.log(this.form_document.value);
    return this.form_document.value.no != '' &&
      this.form_document.value.fecha != '' &&
      this.form_document.value.enviado != '' &&
      this.form_document.value.rsb != '' &&
      this.form_document.value.rs != '' &&
      this.form_document.value.fecha_registro_ctc != '' &&
      this.form_document.value.asunto != '' &&
      this.form_document.value.doc != '' &&
      this.form_document.value.ej != '' &&
      this.form_document.value.clasif != '' &&
      this.form_document.value.destino != '' &&
      this.form_document.value.traslado != '' &&
      this.form_document.value.fecha_traslado != '' &&
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
