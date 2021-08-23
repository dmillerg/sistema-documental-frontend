import { ApiService } from './../../../service/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Permisos } from './../../../models/permisos';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {

  constructor(private storage: LocalStorageService, private api: ApiService) { }

  permisos: Permisos[] = [];

  ngOnInit() {
    const user = this.storage.retrieve('usuario');
    console.log(user );
    this.api.getRolByRolName(user.rol_name).subscribe((result)=>{
      console.log(result);
    })
  }

}
