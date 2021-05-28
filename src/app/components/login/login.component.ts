import { ModalDocumentsComponent } from './../modals/modal-documents/modal-documents.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  addressForm = this.fb.group({
    user: [null, Validators.required],
    password: [null, Validators.required],
    remember: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private router: Router, private modalService: NgbModal) { }

  mostrarModal() {
    var modal = this.modalService.open(ModalDocumentsComponent);
    modal.componentInstance.modalHeader = "Login muestra su modal";
    modal.componentInstance.modalmessage = "Este es el cuerpo del modal";
  }

  onSubmit(): void {
    this.router.navigate(['home']);
  }
}
