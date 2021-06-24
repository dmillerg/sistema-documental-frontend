import { ModalPermisosComponent } from './../../../modals/modal-permisos/modal-permisos.component';
import { ModalRolComponent } from './../../../modals/modal-rol/modal-rol.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../service/api.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDeleteComponent } from 'src/app/components/modals/modal-delete/modal-delete.component';
import { FormControl } from '@angular/forms';
import { Roles } from 'src/app/models/roles';


@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styleUrls: ['./table-roles.component.css']
})
export class TableRolesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'rol_name', 'description', 'actions'];

  toppings = new FormControl();

  toppingList: string[] = ['description', 'nombre de rol'];
  dataSource: MatTableDataSource<Roles>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;

  filter: string = '';
  filtro_description: string = '';
  filtro_rol_name: string = '';


  filtro_description_view: boolean = false;
  filtro_rol_name_view: boolean = false;

  // Top Bar
  top_bar_title: string = "Roles";
  top_bar_subtitle: string = "Roles registrados";
  top_bar_icon: string = "account_box";

  sortedData: Roles[];
  array_roles: Roles[];

  filtros_row: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  message_server: string = '';

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.api.ObtenerRoles(this.filtro_rol_name,this.filtro_description).subscribe((result) => {
      if(result.length>0){
      this.isLoadingResults = false;
      this.array_roles = result;
      this.isRateLimitReached = false;
      this.dataSource = new MatTableDataSource(result);
      this.resultsLength = result.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }else{
        this.array_roles = [];
        this.dataSource = new MatTableDataSource([]);
        this.resultsLength = 0;
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        this.message_server = "No hay roles registrados";
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

  actualizarRol(row: Roles) {
    var modal = this.modalService.open(ModalRolComponent);
    modal.componentInstance.modalHeader = "Rol";
    modal.componentInstance.modalmessage = "Debe al menos modificar uno de los campos";
    modal.componentInstance.modal_action = "Editar";
    modal.componentInstance.id = row.id;
    modal.componentInstance.rol_name = row.rol_name;
    modal.componentInstance.description_model = row.description;


    // Emitir desde el modal contenido de este al cerrarlo
    modal.result.then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  eliminarRol(id: number) {
    var modal = this.modalService.open(ModalDeleteComponent);
    modal.componentInstance.modalHeader = "Rol";
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
    this.filtros_row = this.toppings.value.indexOf('description') != -1 || this.toppings.value.indexOf('nombre de rol') != -1;
    this.filtro_description_view = this.toppings.value.indexOf('description') != -1;
    this.filtro_rol_name_view = this.toppings.value.indexOf('nombre de rol') != -1;
  }

  sortData(sort: Sort) {
    const data = this.array_roles.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'rol_name': return compare(a.rol_name, b.rol_name, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }

  isSearch(): boolean {
    return this.filtro_description != '' || this.filtro_rol_name != '';
  }

  asignarPermisos(rol_name: string, rol_id: number){
    var modal = this.modalService.open(ModalPermisosComponent);
    modal.componentInstance.modalHeader = 'Permisos';
    modal.componentInstance.modal_action = 'Asignar';
    modal.componentInstance.rol_name = rol_name;
    modal.componentInstance.rol_id = rol_id;
     // Emitir desde el modal contenido de este al cerrarlo
     modal.result.then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

