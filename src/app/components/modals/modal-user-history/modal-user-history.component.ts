import { ApiService } from './../../../service/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserHistory } from 'src/app/models/userhistory';

@Component({
  selector: 'app-modal-user-history',
  templateUrl: './modal-user-history.component.html',
  styleUrls: ['./modal-user-history.component.css']
})
export class ModalUserHistoryComponent implements OnInit {

  modal_action: string = 'Ver';
  modalHeader: string = '';
  actiModal: NgbActiveModal;
  user_id: number = -1;

  displayedColumns: string[] = ['id', 'user', 'accion', 'fecha'];
  dataSource: MatTableDataSource<UserHistory>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  message_server: string = '';
  user: string = '';
  rol: string = 'Historial de acciones';
  src_avatar : any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activeModal: NgbActiveModal, private api: ApiService) {
    this.actiModal = activeModal;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getAvatarUser(this.user_id).subscribe((result) => {
      this.src_avatar = result;
    }, (error) => {
      this.src_avatar = error.url;
    });

    this.api.getUserHistory(this.user_id).subscribe((result) => {
      if (result.length > 0) {
        this.dataSource = new MatTableDataSource(result);
        this.resultsLength = result.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      }
      else {
        this.dataSource = new MatTableDataSource([]);
        this.resultsLength = 0;
        this.isRateLimitReached = true;
        this.isLoadingResults = false;
        this.message_server = 'El usuario no ha ingresado nunca a la pagina';
      }
    }, (error) => {
      this.message_server = error.error.message;
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.resultsLength = 0;
    })
  }

}
