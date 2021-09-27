import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documento-limitado',
  templateUrl: './documento-limitado.component.html',
  styleUrls: ['./documento-limitado.component.css']
})
export class DocumentoLimitadoComponent implements OnInit {

  isLoadingResults: boolean = false;
  isRateLimitReached: boolean = false;
  subtitle: string = '';
  icon: string = '';
  title: string = 'Documentos Limitados';
  filtro:string = '';
  constructor() { }

  ngOnInit(): void {
  }

  registerOrUpdate(event){

  }

  filtroAll() {
    // this.documentos = this.documentos_reser.filter(fil => fil.title.toLowerCase().indexOf(this.filtro.toLowerCase()) !== -1);
    // console.log(this.filtro);
    // console.log(this.documentos,"*******",this.documentos_reser );
  }

}
