import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from './../../../service/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserHistory } from 'src/app/models/userhistory';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {

  constructor(private storage: LocalStorageService, private api: ApiService) { }

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

  permisos: any[] = [];
  urlImage = 'ctc.png';
  usuario: string = '';
  nombre: string = '';
  register_date: string = '';
  register_hour: string = '';
  rol_name: string = '';

  ngOnInit() {
    const user = this.storage.retrieve('usuario');
    console.log(user );
    this.api.getAvatarUser(user.id).subscribe((result)=>{
      this.urlImage = result.toString();
    },(error)=>{
      this.urlImage = error.url;
    });
    this.usuario = user.user;
    this.nombre = user.full_name;
    this.register_date = user.register_date;
    this.register_hour = user.register_hour;
    this.rol_name = user.rol_name;
    this.permisos.push({ icon: 'done_all', name: 'permiso de todo', granted: user.is_all == 1})
    this.permisos.push({ icon: 'library_books', name: 'permiso de lectura', granted: user.is_read == 1})
    this.permisos.push({ icon: 'edit', name: 'permiso de escritura', granted: user.is_edit == 1})
    this.permisos.push({ icon: 'delete_sweep', name: 'permiso de eliminacion', granted: user.is_delete == 1})
    this.permisos.push({ icon: 'create_new_folder', name: 'permiso de creacion', granted: user.is_create == 1})

    this.api.getUserHistory(user.id).subscribe((result) => {
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
    });
  }


}
