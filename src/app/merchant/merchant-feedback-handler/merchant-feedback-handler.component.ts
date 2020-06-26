import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonFeedback } from 'src/app/models/common-feedback.model';
import { Response } from 'src/app/models/response.model';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Component({
  selector: 'app-merchant-feedback-handler',
  templateUrl: './merchant-feedback-handler.component.html',
  styleUrls: ['./merchant-feedback-handler.component.css']
})
export class MerchantFeedbackHandlerComponent implements OnInit {
  response: Response = {
    feedbackId: 9099999,
    response: "no response"
  };


  submitted: boolean = false;
  count: number;
  feedbacks: CommonFeedback[];

  messages: any;
  errormsg: string;
  sizeValid: boolean;
  constructor(private userService: MerchantService, private formBuilder: FormBuilder, private router: Router,private loader:LoadingSpinnerService) { }

  ngOnInit() {
    this.userService.merchantFeedbackHandler().subscribe(data => {
      this.feedbacks = data;
      this.count = this.feedbacks.length;
      this.loader.hide();
    },
      err => {
        console.log(err.stack);
        this.loader.hide();
      });

  }
  send(ResponseForm, id: number) {
    this.submitted = true;
    this.response.feedbackId = id;
    this.response.response = ResponseForm.response;
    let messa = ResponseForm.response;


    this.userService.merchantResponseHandler(this.response).subscribe(data => {
      this.messages = data;
      alert("Response submitted successfully!!");
      window.location.reload();
    },
      err => {
        console.log(err.stack);
      });

  }



}
