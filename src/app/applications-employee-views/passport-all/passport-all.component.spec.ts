import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportAllComponent } from './passport-all.component';

describe('PassportAllComponent', () => {
  let component: PassportAllComponent;
  let fixture: ComponentFixture<PassportAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassportAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassportAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
