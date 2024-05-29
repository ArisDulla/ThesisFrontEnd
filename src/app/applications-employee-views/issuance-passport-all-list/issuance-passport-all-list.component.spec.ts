import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuancePassportAllListComponent } from './issuance-passport-all-list.component';

describe('IssuancePassportAllListComponent', () => {
  let component: IssuancePassportAllListComponent;
  let fixture: ComponentFixture<IssuancePassportAllListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuancePassportAllListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuancePassportAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
