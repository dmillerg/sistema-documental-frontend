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

  user: string ='';
  nombre: string ='';

isHandset$: Observable < boolean > = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver, private storage: LocalStorageService) { }

  ngOnInit(): void {
    var usuario = this.storage.retrieve('usuario');
    this.user = usuario.user;
    this.nombre = usuario.full_name;
  }

}
