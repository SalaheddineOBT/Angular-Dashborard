import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureAlertComponent } from './voiture-alert.component';

describe('CarAlertComponent', () => {
  let component: VoitureAlertComponent;
  let fixture: ComponentFixture<VoitureAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
