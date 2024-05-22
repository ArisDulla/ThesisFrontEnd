import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuancePassportComponent } from './issuance-passport.component';

describe('IssuancePassportComponent', () => {
  let component: IssuancePassportComponent;
  let fixture: ComponentFixture<IssuancePassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuancePassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuancePassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
