import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosOrdinariosComponent } from './documentos-ordinarios.component';

describe('DocumentosOrdinariosComponent', () => {
  let component: DocumentosOrdinariosComponent;
  let fixture: ComponentFixture<DocumentosOrdinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosOrdinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosOrdinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
