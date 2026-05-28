import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineFormComponent } from './domaine-form.component';

describe('DomaineFormComponent', () => {
  let component: DomaineFormComponent;
  let fixture: ComponentFixture<DomaineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomaineFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomaineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
