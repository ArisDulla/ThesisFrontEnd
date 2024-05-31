import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportEditComponent } from './passport-edit.component';

describe('PassportEditComponent', () => {
  let component: PassportEditComponent;
  let fixture: ComponentFixture<PassportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassportEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
