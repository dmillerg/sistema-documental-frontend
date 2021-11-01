import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoLimitadoItemComponent } from './documento-limitado-item.component';

describe('DocumentoLimitadoItemComponent', () => {
  let component: DocumentoLimitadoItemComponent;
  let fixture: ComponentFixture<DocumentoLimitadoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoLimitadoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoLimitadoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
