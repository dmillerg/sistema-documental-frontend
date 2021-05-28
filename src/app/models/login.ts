import { Usuarios } from "./usuarios";

export interface Login {
  message:string;
  status: number;
  usuario: Array<Usuarios>;
}
