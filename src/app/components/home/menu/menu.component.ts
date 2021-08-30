import { ApiService } from './../../../service/api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  panelOpenState = true;
  menu: any[] = []

  constructor(private router: Router, private storage: SessionStorageService, private api: ApiService) { }

  ngOnInit(): void {
    try {
      const user = this.storage.retrieve('usuario');
      this.menu = [
        {
          name: 'Perfil',
          icon: 'contact_mail',
          arrow: true,
          permit: true,
          children: [
            { name: 'Perfil', icon: 'contact_mail', path: 'perfil' },
          ]
        },
        {
          name: 'Administracion',
          icon: 'supervisor_account',
          arrow: true,
          permit: user.is_all == 1,
          children: [
            { name: 'usuarios', icon: 'person', path: 'users', permit: user.is_all == 1, },
            { name: 'roles', icon: 'account_box', path: 'roles', permit: user.is_all == 1, },
            { name: 'permisos', icon: 'perm_identity', path: 'roles-permisos', permit: user.is_all == 1, },
            { name: 'historial', icon: 'event_note', path: 'historial', permit: user.is_all == 1, },
          ]
        },
        {
          name: 'Documentos',
          icon: 'books',
          arrow: true,
          permit: user.is_read == 1,
          children: [
            { name: 'privados', icon: 'assignment', path: 'documentos', permit: user.is_read == 1, },
          ]
        },
        // {
        //   name: 'Configuracion',
        //   icon: 'settings',
        //   arrow: true,
        //   permit: true,
        //   children: [
        //     { name: 'preferencias', icon: 'build', path: 'menu', permit: true, },
        //     { name: 'conexxion', icon: 'network_cell', path: 'top', permit: true, }
        //   ]
        // },
        {
          name: 'Logout',
          icon: 'exit_to_app',
          path: 'logout',
          permit: true,
        }
      ]
    } catch (e) {
      console.log('Error', e);
      this.router.navigate(['/login']);
    }
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
        this.api.saveAccion(user_id, 'Entro a la sesion ' + path).subscribe((result) => {
          this.router.navigate(['home/' + path]);
        }, (err) => {
          console.log(err);
          this.router.navigate(['home/' + path]);
        });
      }
    }
  }

}
