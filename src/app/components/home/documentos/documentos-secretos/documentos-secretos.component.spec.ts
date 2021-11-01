import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosSecretosComponent } from './documentos-secretos.component';

describe('DocumentosSecretosComponent', () => {
  let component: DocumentosSecretosComponent;
  let fixture: ComponentFixture<DocumentosSecretosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosSecretosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosSecretosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
