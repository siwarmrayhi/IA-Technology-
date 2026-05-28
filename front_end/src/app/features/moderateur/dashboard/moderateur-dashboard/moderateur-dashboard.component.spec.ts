import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurDashboardComponent } from './moderateur-dashboard.component';

describe('ModerateurDashboardComponent', () => {
  let component: ModerateurDashboardComponent;
  let fixture: ComponentFixture<ModerateurDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModerateurDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerateurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
