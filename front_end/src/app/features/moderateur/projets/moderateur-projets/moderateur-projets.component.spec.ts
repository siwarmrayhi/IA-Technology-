import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurProjetsComponent } from './moderateur-projets.component';

describe('ModerateurProjetsComponent', () => {
  let component: ModerateurProjetsComponent;
  let fixture: ComponentFixture<ModerateurProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModerateurProjetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerateurProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
