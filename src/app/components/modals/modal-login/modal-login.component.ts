import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  actiModal: NgbActiveModal;
  user: string;
  password: string;

  message_error: boolean = false;

  disable_register: boolean = true;
  login;
  ok: boolean = true;

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private router: Router, private storage: LocalStorageService,private toastr: ToastrService,private toastrService: ToastService) {
    this.actiModal = this.activeModal;
  }

  ngOnInit() {
  }

  validar() {
    this.disable_register = !this.validarCamposVacios();
  }

  validarCamposVacios(): boolean {
    return this.user != '' && this.password != '';
  }

  onSubmit() {
    this.api.LoginUser(this.user, this.password).subscribe((results) => {
      this.ok = false;
      const change = document.getElementById("accept").className = "accept";
      // this.toastr.success('Mensaje', 'usted se ha authenticado correctamente');
      this.toastrService.success('usted se ha authenticado correctamente','Mensaje' );
      this.login = results.usuario[0];
      setTimeout(() => {
        this.loguear()
       }, 2000);
    }, (error) => {
      // this.message_error = true;
      console.log('error', error);
      // this.toastr.error('Error', 'usuario o contraseña incorrecta \n '+ error);
      this.toastrService.error( error.error.message,'Error');
    });
  }

  loguear() {
    this.activeModal.close('authenticated');
    this.storage.store('usuario', this.login);
    this.router.navigate(['home/']);
  }

}
