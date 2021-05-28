/** Example file/folder data. */
export const files = [
  {
    name: 'Administracion',
    type: 'supervisor_account',
    children: [
      { name: 'usuarios', type: 'people', path: 'login' },
      { name: 'roles', type: 'account_box', path: 'drag' },
      { name: 'permisos', type: 'perm_identity', path: 'documents' },
    ],
path:''
  },
  {
    name: 'Documentos',
    type: 'book',
    children: [
      { name: 'documentos secretos', type: 'assignment', path: 'menu' },
      { name: 'documentos oficiales', type: 'notes', path: 'drag' }
    ],
    path:''
  },
  {
    name: 'Configuracion',
    type: 'folder',
    children: [
      { name: 'gulpfile.js', type: 'bookmark' ,path: 'menu'},
      { name: 'README.md', type: 'file',path: 'drag' }
    ]
  }
];
