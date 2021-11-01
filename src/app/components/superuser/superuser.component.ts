import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.css']
})
export class SuperuserComponent implements OnInit {

  user = '';
  pass = '';
  confirm = '';
  back = 'Volver';

  constructor(private api: ApiService, private router: Router, private toastrService: ToastService) { }

  ngOnInit(): void {
  }

  createSuperUser(){
    this.api.createSuperUser(this.user,this.pass, this.confirm).subscribe((result)=>{
      this.router.navigate(['/login']);
      this.toastrService.success('Superusuario creado correctamente', 'Mensaje');
    },(error)=>{
      this.toastrService.error('Error no se ha creado el superusuario vuelva a intentarlo', 'Error');
    })
  }

  backLogin(){
    this.router.navigate(['/login']);
  }

}
