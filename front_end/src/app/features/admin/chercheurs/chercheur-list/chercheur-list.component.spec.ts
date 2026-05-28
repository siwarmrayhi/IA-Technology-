import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercheurListComponent } from './chercheur-list.component';

describe('ChercheurListComponent', () => {
  let component: ChercheurListComponent;
  let fixture: ComponentFixture<ChercheurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChercheurListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChercheurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
