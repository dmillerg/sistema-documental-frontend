import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosSecretosItemComponent } from './documentos-secretos-item.component';

describe('DocumentosSecretosItemComponent', () => {
  let component: DocumentosSecretosItemComponent;
  let fixture: ComponentFixture<DocumentosSecretosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosSecretosItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosSecretosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
