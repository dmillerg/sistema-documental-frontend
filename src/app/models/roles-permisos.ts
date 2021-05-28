export interface RolesPermisos {
  id: number;
  user: string;
  rol_name: string;
  is_all: boolean;
  is_edit: boolean;
  is_create: boolean;
  is_delete: boolean;
  is_read: boolean;
}
