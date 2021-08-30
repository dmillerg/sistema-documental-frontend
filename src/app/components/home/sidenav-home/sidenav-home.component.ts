import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-home',
  templateUrl: './sidenav-home.component.html',
  styleUrls: ['./sidenav-home.component.css']
})
export class SidenavHomeComponent implements OnInit, AfterViewInit {

  id_usuario: number = -1;
  user: string = '';
  rol: string = '';
  nombre: string = '';
  src_avatar;
  loadingAvatar: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private storage: SessionStorageService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    try {
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
    } catch (e) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.finishLoading();
    }, 1500);
  }

  finishLoading() {
    this.loadingAvatar = true;
  }
}
