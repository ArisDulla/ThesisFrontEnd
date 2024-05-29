import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuancePassportListComponent } from './issuance-passport-list.component';

describe('IssuancePassportListComponent', () => {
  let component: IssuancePassportListComponent;
  let fixture: ComponentFixture<IssuancePassportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuancePassportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuancePassportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
