import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Sistema';
  public loading = true;

  constructor() {
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.loading = false;
    }, 10000);
  }

}
