import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheftOrLossPassportComponent } from './theft-or-loss-passport.component';

describe('TheftOrLossPassportComponent', () => {
  let component: TheftOrLossPassportComponent;
  let fixture: ComponentFixture<TheftOrLossPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheftOrLossPassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheftOrLossPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
