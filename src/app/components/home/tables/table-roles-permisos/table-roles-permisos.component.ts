import { ModalPermisosComponent } from './../../../modals/modal-permisos/modal-permisos.component';
import { RolesPermisos } from '../../../../models/roles-permisos';
import { ModalUsuarioComponent } from '../../../modals/modal-usuario/modal-usuario.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../../../../models/usuarios';
import { ApiService } from '../../../../service/api.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDeleteComponent } from 'src/app/components/modals/modal-delete/modal-delete.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-roles-permisos',
  templateUrl: './table-roles-permisos.component.html',
  styleUrls: ['./table-roles-permisos.component.css']
})

export class TableRolesPermisosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'user', 'rol_name', 'is_all', 'is_edit', 'is_create', 'is_read', 'is_delete'];

  toppings = new FormControl();

  toppingList: string[] = ['usuario', 'nombre de rol'];
  dataSource: MatTableDataSource<RolesPermisos>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;

  filter: string = '';
  filtro_usuario: string = '';
  filtro_rol_name: string = '';


  filtro_usuario_view: boolean = false;
  filtro_rol_name_view: boolean = false;

  // Top Bar
  top_bar_title: string = "Permisos";
  top_bar_subtitle: string = "Permisos para cada rol";
  top_bar_icon: string = "perm_identity";

  sortedData: RolesPermisos[];
  array_permisos: RolesPermisos[];

  filtros_row: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  message_server: string = '';

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.api.ObtenerRolesPermisos(this.filtro_usuario, this.filtro_rol_name).subscribe((result) => {
      if (result.length > 0) {
        this.isLoadingResults = false;
        this.array_permisos = result;
        this.isRateLimitReached = false;
        this.dataSource = new MatTableDataSource(result);
        this.resultsLength = result.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.array_permisos = [];
        this.dataSource = new MatTableDataSource([]);
        this.resultsLength = 0;
        this.isRateLimitReached = true;
        this.message_server = "no hay usuarios con permisos registrados";
      }
    },
      (error) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        this.message_server = error.error.message;
        // console.log(error)
      });
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  registerOrUpdate(event: boolean) {
    this.loadData();
  }

  actualizarPermisos(row: RolesPermisos) {
    var modal = this.modalService.open(ModalUsuarioComponent);
    modal.componentInstance.modalHeader = "Permisos";
    modal.componentInstance.modalmessage = "Debe al menos modificar uno de los campos";
    modal.componentInstance.modal_action = "Editar";
    modal.componentInstance.rol_permiso.id = row.id;
    modal.componentInstance.rol_permiso.user = row.user;
    modal.componentInstance.rol_permiso.rol_name = row.rol_name;
    modal.componentInstance.rol_permiso.is_all = row.is_all;
    modal.componentInstance.rol_permiso.is_edit = row.is_edit;
    modal.componentInstance.rol_permiso.is_create = row.is_create;
    modal.componentInstance.rol_permiso.is_delete = row.is_delete;
    modal.componentInstance.rol_permiso.is_read = row.is_read;


    // Emitir desde el modal contenido de este al cerrarlo
    modal.result.then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  eliminarRolPemisos(id: number) {
    var modal = this.modalService.open(ModalDeleteComponent);
    modal.componentInstance.modalHeader = "RolPermisos";
    modal.componentInstance.id = id;
    modal.result.then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  filtrarTodo() {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  // filtrarByUser() {
  //   this.dataSource.filterPredicate = (data: Usuarios, filter: string) => data.user.toLocaleLowerCase().indexOf(filter) != -1;
  //   this.dataSource.filter = this.filtro_usuario.toLocaleLowerCase().trim();
  // }

  onChangeSelectFilter() {
    this.filtros_row = this.toppings.value.indexOf('usuario') != -1 || this.toppings.value.indexOf('nombre de rol') != -1;
    this.filtro_usuario_view = this.toppings.value.indexOf('usuario') != -1;
    this.filtro_rol_name_view = this.toppings.value.indexOf('nombre de rol') != -1;
  }

  sortData(sort: Sort) {
    const data = this.array_permisos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'user': return compare(a.user, b.user, isAsc);
        case 'rol_name': return compare(a.rol_name, b.rol_name, isAsc);
        default: return 0;
      }
    });
  }

  isSearch(): boolean {
    return this.filtro_usuario != '' || this.filtro_rol_name != '';
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

