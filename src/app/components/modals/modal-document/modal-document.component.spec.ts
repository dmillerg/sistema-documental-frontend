/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalDocumentComponent } from './modal-document.component';

describe('ModalDocumentComponent', () => {
  let component: ModalDocumentComponent;
  let fixture: ComponentFixture<ModalDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
