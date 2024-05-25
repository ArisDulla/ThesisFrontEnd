import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalPassportComponent } from './renewal-passport.component';

describe('RenewalPassportComponent', () => {
  let component: RenewalPassportComponent;
  let fixture: ComponentFixture<RenewalPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenewalPassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewalPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
