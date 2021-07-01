import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalPermisosComponent } from './components/modals/modal-permisos/modal-permisos.component';
import { ModalRolComponent } from './components/modals/modal-rol/modal-rol.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalDocumentsComponent } from './components/modals/modal-documents/modal-documents.component';
import { ModalUsuarioComponent } from './components/modals/modal-usuario/modal-usuario.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ModalDeleteComponent } from './components/modals/modal-delete/modal-delete.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalDocumentsComponent,
    ModalUsuarioComponent,
    ModalRolComponent,
    ModalPermisosComponent,
    ModalDeleteComponent,
    ModalLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
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
    NgbModule,
    MatCheckboxModule,
    HttpClientModule,
    MatStepperModule,
    NgxWebstorageModule.forRoot(),
    MaterialFileInputModule,
    ToastrModule.forRoot(),
    ToastModule.forRoot(),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
