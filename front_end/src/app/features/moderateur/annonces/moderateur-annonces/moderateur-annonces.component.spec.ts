import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurAnnoncesComponent } from './moderateur-annonces.component';

describe('ModerateurAnnoncesComponent', () => {
  let component: ModerateurAnnoncesComponent;
  let fixture: ComponentFixture<ModerateurAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModerateurAnnoncesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerateurAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
