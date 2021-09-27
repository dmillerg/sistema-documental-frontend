import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosClasificadosComponent } from './documentos-clasificados.component';

describe('DocumentosClasificadosComponent', () => {
  let component: DocumentosClasificadosComponent;
  let fixture: ComponentFixture<DocumentosClasificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosClasificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosClasificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
