import { ApiService } from './../../../service/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  modalHeader: string = "";
  modalmessage: string = "Para confirmar que desea eliminar y no es solo por equivocacion por favor inserte `borrar` en el campo a continuacion luego presione aceptar";
  actiModal: NgbActiveModal;
  confirmar: string = "";
  id: number = -1;
  icon: string = 'delete_forever';
  color: string = "warn";

  disable_button = true;

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private toastrService: ToastService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit() {
  }

  eliminar() {
    switch (this.modalHeader) {
      case "Usuario":
        this.api.DeleteUsuario(this.id).subscribe((result) => {
          console.log(result);
          this.activeModal.close(result);
          this.toastrService.success("Usuario borrado satisfactoriamente", "Mensaje");
        },
          (err) => {
            this.toastrService.error(err.error.message, "Error");
          });
        break;
      case "Rol":
        this.api.DeleteRol(this.id).subscribe((result) => {
          console.log(this.activeModal.close(result));
          this.toastrService.success("Rol borrado satisfactoriamente", "Mensaje");
        },
          (err) => {
            this.toastrService.error(err.error.message, "Error");
          });
        break;
      case "Documento":
        this.api.deleteDocument(this.id).subscribe((result) => {
          console.log(this.activeModal.close(result));
          this.toastrService.success("Documento borrado satisfactoriamente", "Mensaje");
        }, (err) => {
          this.toastrService.error(err.error.message, "Error");
        })
      default:
        console.log("default");
    }
  }

  permitirBorrar() {
    if (this.confirmar == "borrar") {
      this.disable_button = false;
      this.icon = "done";
      this.color = "primary";
    } else {
      this.disable_button = true;
      this.icon = "delete_forever";
      this.color = "warn";
    }
  }

}
