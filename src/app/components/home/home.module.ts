import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HistoryUserComponent } from './history-user/history-user.component';
import { TableRolesComponent } from './tables/table-roles/table-roles.component';
import { TableRolesPermisosComponent } from './tables/table-roles-permisos/table-roles-permisos.component';
import { TableUserComponent } from './tables/table-users/table-users.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidenavHomeComponent } from './sidenav-home/sidenav-home.component';
import { MenuComponent } from './menu/menu.component';
import { TopBarComponent } from './../top-bar/top-bar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentItemComponent } from './document-list/document-item/document-item.component';
import { DocumentoLimitadoComponent } from './documentos/documento-limitado/documento-limitado.component';
import { DocumentosSecretosComponent } from './documentos/documentos-secretos/documentos-secretos.component';
import { DocumentosOrdinaPersonalesComponent } from './documentos/documentos-ordina-personales/documentos-ordina-personales.component';
import { DocumentosClasificadosComponent } from './documentos/documentos-clasificados/documentos-clasificados.component';
import { DocumentosOrdinariosComponent } from './documentos/documentos-ordinarios/documentos-ordinarios.component';
import { DocumentoLimitadoItemComponent } from './documentos/documento-limitado/documento-limitado-item/documento-limitado-item.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidenavHomeComponent,
    MenuComponent,
    TopBarComponent,
    TableUserComponent,
    TableRolesComponent,
    TableRolesPermisosComponent,
    DocumentListComponent,
    DocumentItemComponent,
    HistoryUserComponent,
    PerfilUsuarioComponent,
    DocumentoLimitadoComponent,
    DocumentosSecretosComponent,
    DocumentosOrdinaPersonalesComponent,
    DocumentosClasificadosComponent,
    DocumentosOrdinariosComponent,
    DocumentoLimitadoItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxLoadingModule.forRoot({}),
    MatMenuModule,
  ]
})
export class HomeModule { }
