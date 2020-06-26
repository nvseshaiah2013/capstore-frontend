import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ControlContainer} from '@angular/forms';
import { CustomerService } from '../CustomerService/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common-feedback-form',
  templateUrl: './common-feedback-form.component.html',
  styleUrls: ['./common-feedback-form.component.css']
})
export class CommonFeedbackFormComponent implements OnInit {
  username:String;
  merchants:String[];
  submitted: boolean = false;
  feedbackForm: FormGroup;
  messages:any;
  errormsg:string;
  sizeValid:boolean;
  constructor(private userService:CustomerService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      username: [this.username],
      merchant_name:['',Validators.required],
      feedbackSubject:['',Validators.required],
      feedbackMessage:['',Validators.required]
        });
        this.userService.getMerchantList().subscribe(data => {
          this.merchants = data;
        },
          err => {
            console.log(err.stack);
          });
    
  }
  send()
  {
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return;
    }
    this.userService.userFeedback(this.feedbackForm.value).subscribe(data => {
      this.messages= data
      alert("Feedback submitted successfully!!We will get back to you");
      this.router.navigate(['customer','merchant-feedbacks']);
    },
      err => {
        console.log(err.stack);
      });
    
  }

}
