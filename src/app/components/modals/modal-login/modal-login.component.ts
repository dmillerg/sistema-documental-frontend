import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

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

  constructor(private activeModal: NgbActiveModal, private api: ApiService, private router: Router,private storage:LocalStorageService) {
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
      this.activeModal.close('authenticated');
      this.storage.store('usuario', results.usuario[0]);
      this.router.navigate(['home/']);
    }, (error) => {
      this.message_error = true;
      console.log('error', error);
    })
  }

}
