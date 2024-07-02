import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoggedComponent } from './navbar-logged.component';

describe('NavbarLoggedComponent', () => {
  let component: NavbarLoggedComponent;
  let fixture: ComponentFixture<NavbarLoggedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLoggedComponent]
    });
    fixture = TestBed.createComponent(NavbarLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
