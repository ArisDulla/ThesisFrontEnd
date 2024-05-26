import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceMinorsPassportComponent } from './issuance-minors-passport.component';

describe('IssuanceMinorsPassportComponent', () => {
  let component: IssuanceMinorsPassportComponent;
  let fixture: ComponentFixture<IssuanceMinorsPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuanceMinorsPassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuanceMinorsPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
