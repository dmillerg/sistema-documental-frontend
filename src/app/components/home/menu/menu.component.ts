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
      children: [
        { name: 'usuarios', icon: 'people', path: 'users' },
        { name: 'roles', icon: 'account_box', path: 'roles' },
        { name: 'permisos', icon: 'perm_identity', path: 'roles-permisos' },
      ]
    },
    {
      name: 'Documentos',
      icon: 'books',
      children: [
        { name: 'secretos', icon: 'assignment', path: 'menu' },
        { name: 'oficiales', icon: 'notes', path: 'drag' }
      ]
    },
    {
      name: 'Configuracion',
      icon: 'settings',
      children: [
        { name: 'preferencias', icon: 'build' ,path: 'menu'},
        { name: 'conexxion', icon: 'network_cell',path: 'top' }
      ]
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**click sobre uno de los children */
  navigateTo(path){
    console.log('click',path);
    this.router.navigate(['home/'+path]);
  }

}
