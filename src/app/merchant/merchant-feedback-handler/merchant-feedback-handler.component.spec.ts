import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFeedbackHandlerComponent } from './merchant-feedback-handler.component';

describe('MerchantFeedbackHandlerComponent', () => {
  let component: MerchantFeedbackHandlerComponent;
  let fixture: ComponentFixture<MerchantFeedbackHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantFeedbackHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantFeedbackHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
