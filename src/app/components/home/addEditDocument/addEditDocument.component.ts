import { Component, OnInit } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-addEditDocument',
  templateUrl: './addEditDocument.component.html',
  styleUrls: ['./addEditDocument.component.css']
})
export class AddEditDocumentComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  s;

  constructor() { }

  ngOnInit() {
    this.s = document.querySelector("#hola");
    console.log(this.s);
  }

  hola(event){

    (<HTMLInputElement>document.getElementById("hola")).value = "";
console.log(document.querySelector("#hola"))
  }
}
