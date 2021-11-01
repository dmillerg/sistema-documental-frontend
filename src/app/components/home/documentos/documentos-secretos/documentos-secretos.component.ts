import { FormGroup, FormControl } from '@angular/forms';
import { ModalDeleteComponent } from './../../../modals/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDocumentSecretoComponent } from 'src/app/components/modals/modal-document-secreto/modal-document-secreto.component';

@Component({
  selector: 'app-documentos-secretos',
  templateUrl: './documentos-secretos.component.html',
  styleUrls: ['./documentos-secretos.component.css']
})
export class DocumentosSecretosComponent implements OnInit {
  title: string = 'Documentos Secretos';
  subtitle: string = 'Vista privada no para todos los usuarios';
  icon: string = 'assignment';
  documentos: any[] = [];
  documentos_reser: any[] = [];
  breakpoint;
  server_message;
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  filtro_visivility: string = 'pyp';
  filtro: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  registerOrUpdate(event){

  }

  loadData() {
    this.isLoadingResults = true
    this.api.getDocumentsSecret(1).subscribe((result) => {
      if (result.length > 0) {
        console.log('resultados', result);
        this.documentos = result;
        this.documentos_reser = result;
        this.isLoadingResults = false;
      } else {
        this.documentos = [];
        this.documentos_reser = [];
        this.isLoadingResults = false;
        this.server_message = 'No hay documentos en estos momentos';
      }
      this.iniLista();
    }, (error) => {
      console.log(error);
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.server_message = 'El servidor no esta disponible en estos momentos';
      this.iniLista();
    });
  }

  onResize(event) {
    const screenWidth = event.target.innerWidth;
    const screenHeigth = event.target.innerHeight;
    this.redimensionarListaWidth(screenWidth);
    this.redimensionarListaHeigth(screenHeigth);
    // this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 4;
  }

  redimensionarListaWidth(screen) {
    if (screen <= 597) {
      this.breakpoint = 1;
    } else if (screen <= 870) {
      this.breakpoint = 2;
    } else if (screen <= 1085) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  redimensionarListaHeigth(screen) {
    const heigth = screen - 290;
    // console.log(heigth);
    document.getElementById("lista").style.height = heigth + 'px';
  }

  iniLista() {
    if (!this.isLoadingResults) {
      var lista = document.getElementById("lista");
      this.redimensionarListaWidth(lista.clientWidth);
      // this.redimensionarListaHeigth(lista.clientHeight);
    }
  }

  onDelete(event) {
    this.loadData();
  }

  filtroAll() {
    this.documentos = this.documentos_reser.filter(fil => fil.titulo.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1);
    // console.log(this.filtro);
    // console.log(this.documentos,"*******",this.documentos_reser );
  }

  registerOrUpdateOrDelete(event){
    if(event){
      this.loadData();
    }
  }

}
