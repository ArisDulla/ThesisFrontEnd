import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectGoogleComponent } from './redirect-google.component';

describe('RedirectGoogleComponent', () => {
  let component: RedirectGoogleComponent;
  let fixture: ComponentFixture<RedirectGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedirectGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedirectGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
