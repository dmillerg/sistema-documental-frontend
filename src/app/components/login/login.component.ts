import { ElectronService } from './../../service/electron.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../service/api.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ModalLoginComponent } from './../modals/modal-login/modal-login.component';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {

  hasUnitNumber = false;
  user: string;
  password: string;

  message_error: boolean = false;

  disable_register: boolean = true;
  login;
  ok: boolean = true;

  constructor(private router: Router, private modalService: NgbModal, private api: ApiService,private storage: SessionStorageService,private toastr: ToastrService,private toastrService: ToastService, private ipc: ElectronService) { }

   ngAfterViewInit(): void {
  }

  validar() {
    this.disable_register = !this.validarCamposVacios();
  }

  validarCamposVacios(): boolean {
    return this.user != '' && this.password != '';
  }

  onSubmit() {

    this.api.LoginUser(this.user, this.password).subscribe((results) => {
      const change = document.getElementById("accept").className = "accept";
      // this.toastr.success('Mensaje', 'usted se ha authenticado correctamente');
      this.toastrService.success('usted se ha authenticado correctamente','Mensaje' );
      this.login = results.usuario[0];
      setTimeout(() => {
        this.icono()
       }, 1000);
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

  icono(){
    this.ok = false;
  }

  loguear() {
    this.storage.store('usuario', this.login);
    this.router.navigate(['home/']);
  }

  keyPress(event: KeyboardEvent){
    console.log(event);
  }

  salirApp(){

    this.ipc.send("window-close");
  }

}
