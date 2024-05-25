import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementPassportComponent } from './replacement-passport.component';

describe('ReplacementPassportComponent', () => {
  let component: ReplacementPassportComponent;
  let fixture: ComponentFixture<ReplacementPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplacementPassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplacementPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
