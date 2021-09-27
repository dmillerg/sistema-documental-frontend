import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosOrdinaPersonalesComponent } from './documentos-ordina-personales.component';

describe('DocumentosOrdinaPersonalesComponent', () => {
  let component: DocumentosOrdinaPersonalesComponent;
  let fixture: ComponentFixture<DocumentosOrdinaPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosOrdinaPersonalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosOrdinaPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
