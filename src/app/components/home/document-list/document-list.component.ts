import { ApiService } from './../../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  title: string = 'Documentos Secretos';
  subtitle: string = 'Vista privada no para todos los usuarios';
  icon: string = 'assignment';
  documentos: any[] = [];
  breakpoint;
  server_message;
  isLoadingResults: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 4;
    this.loadData();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 4;
  }

  registerOrUpdate(event: boolean) {
    this.loadData();
  }

  loadData() {
    this.isLoadingResults = true
    this.api.getDocuments(1).subscribe((result) => {
      if (result.length > 0) {
        this.documentos = result;
        this.isLoadingResults = false;
      }else{
        this.documentos = [];
        this.isLoadingResults = false;
        this.server_message = 'No hay documentos en estos momentos';
      }
    }, (error) => {
      console.log(error);
      this.isLoadingResults = false;
      this.server_message = error.message;
    });
  }

}
