import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosClasificadosItemComponent } from './documentos-clasificados-item.component';

describe('DocumentosClasificadosItemComponent', () => {
  let component: DocumentosClasificadosItemComponent;
  let fixture: ComponentFixture<DocumentosClasificadosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosClasificadosItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosClasificadosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
