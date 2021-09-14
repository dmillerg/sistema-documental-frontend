import { ElectronService } from './service/electron.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ApiService } from './service/api.service';
import { Component, ViewChild, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'Sistema';
  public loading = true;

  constructor(private api: ApiService, private storage: SessionStorageService, private ipc: ElectronService) {
  }
  ngOnDestroy(): void {
    try {
      const user_id = this.storage.retrieve('usuario').id;
      this.api.LogoutUser(user_id).subscribe((result) => {
        console.log('Logout: ', result);
      });
    } catch (e) {
      console.log('Error en el destroy de appComponent');
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.loading = false;
    }, 200);
  }

  salirApp(){
    this.ipc.send("window-close");
  }
}
