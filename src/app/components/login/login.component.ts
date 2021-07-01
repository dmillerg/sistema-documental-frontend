import { ModalLoginComponent } from './../modals/modal-login/modal-login.component';
import { ModalDocumentsComponent } from './../modals/modal-documents/modal-documents.component';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {

  hasUnitNumber = false;

  constructor(private router: Router, private modalService: NgbModal) { }
  ngAfterViewInit(): void {
    this.mostrarModal();
  }



  mostrarModal() {
    var modal = this.modalService.open(ModalLoginComponent,{
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      windowClass : "modal-size",
    });
    modal.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // modal.componentInstance.modalHeader = "Login muestra su modal";
    // modal.componentInstance.modalmessage = "Este es el cuerpo del modal";
  }

  onSubmit(): void {
    this.router.navigate(['home']);
  }
}
