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
        { name: 'usuarios', icon: 'people', path: 'users' },
        { name: 'roles', icon: 'account_box', path: 'roles' },
        { name: 'permisos', icon: 'perm_identity', path: 'roles-permisos' },
      ]
    },
    {
      name: 'Documentos',
      icon: 'books',
      arrow: true,
      children: [
        { name: 'secretos', icon: 'assignment', path: 'menu' },
        { name: 'oficiales', icon: 'notes', path: 'drag' }
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
      icon: 'logout',
      path: 'logout'
    }
  ]

  constructor(private router: Router, private storage: LocalStorageService) { }

  ngOnInit(): void {
  }

  /**click sobre uno de los children */
  navigateTo(path) {
    console.log('click', path);
    if (path) {
      if (path == 'logout') {
        this.storage.clear();
        this.router.navigate(['']);
      } else
        this.router.navigate(['home/' + path]);
    }
  }

}
