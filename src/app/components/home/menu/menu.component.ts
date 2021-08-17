import { ApiService } from './../../../service/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  panelOpenState = true;
  menu = [
    {
      name: 'Administracion',
      icon: 'supervisor_account',
      arrow: true,
      children: [
        { name: 'usuarios', icon: 'person', path: 'users' },
        { name: 'roles', icon: 'account_box', path: 'roles' },
        { name: 'permisos', icon: 'perm_identity', path: 'roles-permisos' },
      ]
    },
    {
      name: 'Documentos',
      icon: 'books',
      arrow: true,
      children: [
        { name: 'secretos', icon: 'assignment', path: 'documentos' },
        { name: 'useronline', icon: 'notes', path: 'useronline' }
      ]
    },
    {
      name: 'Configuracion',
      icon: 'settings',
      arrow: true,
      children: [
        { name: 'preferencias', icon: 'build', path: 'menu' },
        { name: 'conexxion', icon: 'network_cell', path: 'top' }
      ]
    },
    {
      name: 'Logout',
      icon: 'exit_to_app',
      path: 'logout'
    }
  ]

  constructor(private router: Router, private storage: LocalStorageService, private api: ApiService) { }

  ngOnInit(): void {
  }

  /**click sobre uno de los children */
  navigateTo(path) {
    console.log('click', path);
    if (path) {
      const user_id = this.storage.retrieve('usuario').id;
      if (path == 'logout') {
        const user_id = this.storage.retrieve('usuario').id;
        this.storage.clear();
        this.router.navigate(['']);
        this.api.LogoutUser(user_id).subscribe((result) => {
          console.log('Logout: ', result)
        })
      } else {
        this.api.saveAccion(user_id, 'Entro a la sesion ' + path).subscribe((result)=>{
          this.router.navigate(['home/' + path]);
        });
      }
    }
  }

}
