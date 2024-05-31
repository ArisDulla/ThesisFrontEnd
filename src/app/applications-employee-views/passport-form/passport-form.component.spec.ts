import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportFormComponent } from './passport-form.component';

describe('PassportFormComponent', () => {
  let component: PassportFormComponent;
  let fixture: ComponentFixture<PassportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassportFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
