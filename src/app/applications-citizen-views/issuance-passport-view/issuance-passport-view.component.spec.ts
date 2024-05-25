import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuancePassportViewComponent } from './issuance-passport-view.component';

describe('IssuancePassportViewComponent', () => {
  let component: IssuancePassportViewComponent;
  let fixture: ComponentFixture<IssuancePassportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuancePassportViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuancePassportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
