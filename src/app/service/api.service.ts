import { Roles } from './../models/roles';
import { RolesPermisos } from '../models/roles-permisos';
import { Observable } from 'rxjs';
import { Usuarios } from './../models/usuarios';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:3000/apis/";

  constructor(private http: HttpClient) { }

  /**
   * obtiene todos los usuarios en la base de datos
   * @returns Observable<Usuarios[]>
   */
  ObtenerUsuarios(user: Usuarios): Observable<Usuarios[]> {
    let direccion = this.url + "usuarios";
    const headers = { 'content-type': 'application/json' };
    const body = {
      "user": user.user,
      "full_name": user.full_name,
      "register_date": user.register_date,
      "register_hour": user.register_hour
    };
    return this.http.get<Usuarios[]>(direccion, { 'headers': headers, params: body });
  }

  /**
   * agrega un usuario a la db
   * @param user
   * @returns void
   */
  AddUsuario(formData) {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'saveUsuario';
    return this.http.post(direccion, formData);
  }

  /**
   * actualiza los datos de un usuario apartir de su id
   * @param user
   * @returns void
   */
  UpdateUsuario(formData,id) {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'usuarios/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * elimina a un usuario a partir de su id
   * @param id
   * @returns void
   */
  DeleteUsuario(id: number) {
    let direccion = this.url + 'usuarios/' + id;
    return this.http.delete(direccion);
  }

  /**
   * obtiene todos los permisos con sus respectivos roles de un o mas usuarios en la base de datos
   * @returns Observable<RolesPermisos[]>
   */
  ObtenerRolesPermisos(filtro_usuario: string, filtro_rol_name: string, user_id: any = 'Admin'): Observable<RolesPermisos[]> {
    let direccion = this.url + "rolesypermisos/" + user_id;
    const headers = { 'content-type': 'application/json' };
    let body = {
      'usuario': filtro_usuario,
      'rol_name': filtro_rol_name,
    };
    return this.http.get<RolesPermisos[]>(direccion, { 'headers': headers, params: body });
  }


  /**
   * obtiene todos los roles en la base de datos
   * @returns Observable<Roles[]>
   */
  ObtenerRoles(filtro_rol_name: string = '', filtro_description: string = ''): Observable<Roles[]> {
    let direccion = this.url + "roles/";
    const headers = { 'content-type': 'application/json' };
    let body = {
      'rol_name': filtro_rol_name,
      'description': filtro_description
    }
    return this.http.get<Roles[]>(direccion, { 'headers': headers, params: body });
  }

  /**
   * Agrega un nuevo rol
   * @param rol
   * @returns
   */
  AddRol(rol: Roles) {
    let direccion = this.url + "roles/";
    const headers = { 'content-type': 'application/json' };
    let body = {
      'rol_name': rol.rol_name,
      'description': rol.description
    }
    return this.http.post(direccion, body);
  }


  /**
   * Actualiza un rol por su id
   * @param rol
   * @returns
   */
  UpdateRol(rol: Roles) {
    let direccion = this.url + "roles/" + rol.id;
    const headers = { 'content-type': 'application/json' };
    let body = {
      'rol_name': rol.rol_name,
      'description': rol.description
    }
    return this.http.post(direccion, body);
  }

  /**
  * elimina un rol a partir de su id
  * @param id
  * @returns void
  */
  DeleteRol(id: number) {
    let direccion = this.url + 'roles/' + id;
    return this.http.delete(direccion);
  }

  /**
 * Agrega permisos a un rol
 * @param rol
 * @returns
 */
  AddPermisos(permisos, id: number = -1) {
    let direccion = this.url + "rolesypermisos/" + id;
    const headers = { 'content-type': 'application/json' };
    let body = {
      "is_all": permisos.is_all,
      "is_edit": permisos.is_edit,
      "is_create": permisos.is_create,
      "is_delete": permisos.is_delete,
      "is_read": permisos.is_read,
      "rol_id": id
    }
    return this.http.post(direccion, body);
  }

  /**
   * Agrega permisos a un rol
   * @param rol
   * @returns
   */
  UpdatePermisos(permisos, id: number = -1) {
    let direccion = this.url + "rolesypermisos/" + id;
    const headers = { 'content-type': 'application/json' };
    let body = {
      "is_all": permisos.is_all,
      "is_edit": permisos.is_edit,
      "is_create": permisos.is_create,
      "is_delete": permisos.is_delete,
      "is_read": permisos.is_read,
      "rol_id": id
    }
    return this.http.post(direccion, body);
  }

  /**
   * Obtiene todos los roles asignados al usuario
   * @param user_id
   * @returns
   */
  ObtenerRolesByUser(user_id: number = -1): Observable<Roles[]>{
    let direccion = this.url +'/rolesbyuser/'+user_id;
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Roles[]>(direccion, { 'headers': headers});
  }

  /**
   * Loguea al usuario en la pagina si es q este existe
   * @param user
   * @param pass
   * @returns
   */
  LoginUser(user: string, pass: string): Observable<Login>{
    let direccion = this.url + '/login';
    let body = {"user": user, "pass": pass};
    return this.http.post<Login>(direccion,body);
  }


  uploadFile(File): Observable<any>{
    let direccion = "http://localhost:3000/uploads";


    return this.http.post(direccion,File);
  }


  getAvatarUser(id){
    let direccion = this.url + 'avatar/' + id;
    return this.http.get(direccion);
  }
}
