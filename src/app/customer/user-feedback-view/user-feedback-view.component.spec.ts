import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbackViewComponent } from './user-feedback-view.component';

describe('UserFeedbackViewComponent', () => {
  let component: UserFeedbackViewComponent;
  let fixture: ComponentFixture<UserFeedbackViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFeedbackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedbackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
