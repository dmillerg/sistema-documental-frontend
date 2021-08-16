import { LocalStorageService } from 'ngx-webstorage';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-home',
  templateUrl: './sidenav-home.component.html',
  styleUrls: ['./sidenav-home.component.css']
})
export class SidenavHomeComponent implements OnInit {

  id_usuario: number = -1;
  user: string ='';
  rol: string = '';
  nombre: string ='';
  src_avatar;

isHandset$: Observable < boolean > = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver, private storage: LocalStorageService, private api: ApiService) { }

  ngOnInit(): void {
    var usuario = this.storage.retrieve('usuario');
    this.id_usuario = usuario.id;
    this.user = usuario.user;
    this.nombre = usuario.full_name;
    this.rol = usuario.rol_name;

    this.api.getAvatarUser(this.id_usuario).subscribe((result) => {
      this.src_avatar = result;
    }, (error) => {
      this.src_avatar = error.url;
    });
  }

}
