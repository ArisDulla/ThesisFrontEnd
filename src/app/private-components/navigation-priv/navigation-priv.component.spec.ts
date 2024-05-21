import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPrivComponent } from './navigation-priv.component';

describe('NavigationPrivComponent', () => {
  let component: NavigationPrivComponent;
  let fixture: ComponentFixture<NavigationPrivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationPrivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
