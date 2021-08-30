import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'Sistema';
  public loading = true;

  constructor() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.loading = false;
    }, 3000);
  }

}
