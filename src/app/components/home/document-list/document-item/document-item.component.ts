import { ApiService } from './../../../../service/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() id: number = -1;
  @Input() src_document: string = './../../../../../ctc.png';
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getDocumentsFoto(this.id).subscribe((result)=>{
      this.src_document = result+'';
    },(error)=>{
      this.src_document = error.url;
    })
  }

}
