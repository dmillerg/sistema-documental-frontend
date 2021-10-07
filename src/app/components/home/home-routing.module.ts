import { DocumentosClasificadosComponent } from './documentos/documentos-clasificados/documentos-clasificados.component';
import { DocumentosSecretosComponent } from './documentos/documentos-secretos/documentos-secretos.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HistoryUserComponent } from './history-user/history-user.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentoLimitadoComponent } from './documentos/documento-limitado/documento-limitado.component';
import { TableRolesComponent } from './tables/table-roles/table-roles.component';
import { TableRolesPermisosComponent } from './tables/table-roles-permisos/table-roles-permisos.component';
import { TableUserComponent } from './tables/table-users/table-users.component';
import { TopBarComponent } from './../top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'menu', component: MenuComponent },
      { path: 'top', component:TopBarComponent},
      { path: 'users', component:TableUserComponent},
      { path: 'roles', component:TableRolesComponent},
      { path: 'roles-permisos', component:TableRolesPermisosComponent },
      { path: 'documentos', component:DocumentListComponent },
      { path: 'documentos-limitados', component:DocumentoLimitadoComponent },
      { path: 'documentos-secretos', component:DocumentosSecretosComponent },
      { path: 'documentos-clasificados', component:DocumentosClasificadosComponent },
      { path: 'perfil', component:PerfilUsuarioComponent },
      { path: 'historial', component:HistoryUserComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
