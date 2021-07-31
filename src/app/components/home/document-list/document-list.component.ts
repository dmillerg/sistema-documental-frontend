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

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 500) ? 1 : 4;
    this.loadData();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 500) ? 1 : 4;
  }

  registerOrUpdate(event: boolean) {
    console.log(event);
  }

  loadData() {
    this.api.getDocuments(1).subscribe((result) => {
      this.documentos = result;
    }, (error) => {
      console.log(error);
    });
  }

}
