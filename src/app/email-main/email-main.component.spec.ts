import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMainComponent } from './email-main.component';

describe('EmailMainComponent', () => {
  let component: EmailMainComponent;
  let fixture: ComponentFixture<EmailMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailMainComponent]
    });
    fixture = TestBed.createComponent(EmailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
