import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFeedbackFormComponent } from './common-feedback-form.component';

describe('CommonFeedbackFormComponent', () => {
  let component: CommonFeedbackFormComponent;
  let fixture: ComponentFixture<CommonFeedbackFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFeedbackFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
