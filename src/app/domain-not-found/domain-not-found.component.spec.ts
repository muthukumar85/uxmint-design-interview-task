import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainNotFoundComponent } from './domain-not-found.component';

describe('DomainNotFoundComponent', () => {
  let component: DomainNotFoundComponent;
  let fixture: ComponentFixture<DomainNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainNotFoundComponent]
    });
    fixture = TestBed.createComponent(DomainNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
