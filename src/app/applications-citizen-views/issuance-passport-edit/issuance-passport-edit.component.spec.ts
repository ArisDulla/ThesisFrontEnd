import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuancePassportEditComponent } from './issuance-passport-edit.component';

describe('IssuancePassportEditComponent', () => {
  let component: IssuancePassportEditComponent;
  let fixture: ComponentFixture<IssuancePassportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuancePassportEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IssuancePassportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
