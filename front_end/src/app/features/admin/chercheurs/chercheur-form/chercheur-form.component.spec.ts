import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercheurFormComponent } from './chercheur-form.component';

describe('ChercheurFormComponent', () => {
  let component: ChercheurFormComponent;
  let fixture: ComponentFixture<ChercheurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChercheurFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChercheurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
