import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoLimitadoComponent } from './documento-limitado.component';

describe('DocumentoLimitadoComponent', () => {
  let component: DocumentoLimitadoComponent;
  let fixture: ComponentFixture<DocumentoLimitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoLimitadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoLimitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
