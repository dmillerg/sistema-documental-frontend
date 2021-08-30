import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage: LocalStorageService, private router: Router) {
    try {
      const user = this.storage.retrieve('usuario');
    } catch (e) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

  }

}
