import { ModalUserHistoryComponent } from './../../modals/modal-user-history/modal-user-history.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserOnline } from './../../../models/useronline';
import { ApiService } from './../../../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-history-user',
  templateUrl: './history-user.component.html',
  styleUrls: ['./history-user.component.css']
})
export class HistoryUserComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'user', 'estado', 'actions'];
  dataSource: MatTableDataSource<UserOnline>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  message_server: string = 'Hoalasds';
  interval: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.loadData();
    this.interval = setInterval(() => {
      this.loadData();
    }, 5000);
  }

  loadData() {
    this.api.getUsersOnline().subscribe((result) => {
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
        this.message_server = 'no hay usuarios registrados';
      }
    }, (error) => {
      this.message_server = error.error.message;
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
      this.resultsLength = 0;
    });
  }


  verHistorial(item) {
    const modal = this.modalService.open(ModalUserHistoryComponent, {backdrop: 'static'});
    modal.componentInstance.user_id = item.user_id;
    modal.componentInstance.user = item.username;
  }
}
