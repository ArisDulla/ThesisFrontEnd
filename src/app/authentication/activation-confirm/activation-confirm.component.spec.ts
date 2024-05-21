import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationConfirmComponent } from './activation-confirm.component';

describe('ActivationConfirmComponent', () => {
  let component: ActivationConfirmComponent;
  let fixture: ComponentFixture<ActivationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivationConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
