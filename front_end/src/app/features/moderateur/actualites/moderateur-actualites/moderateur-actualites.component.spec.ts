import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurActualitesComponent } from './moderateur-actualites.component';

describe('ModerateurActualitesComponent', () => {
  let component: ModerateurActualitesComponent;
  let fixture: ComponentFixture<ModerateurActualitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModerateurActualitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerateurActualitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
