import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../CustomerService/customer.service';
import { CommonFeedback } from 'src/app/models/common-feedback.model';
@Component({
  selector: 'app-user-feedback-view',
  templateUrl: './user-feedback-view.component.html',
  styleUrls: ['./user-feedback-view.component.css']
})
export class UserFeedbackViewComponent implements OnInit {
  username:String;
  feedbacks:CommonFeedback[];
  count:number;
  errormsg:string;
  sizeValid: boolean;
  constructor(private userService:CustomerService) { }

  ngOnInit() {
    this.userService.userFeedbackView().subscribe(data => {
      this.feedbacks = data;
      this.count=this.feedbacks.length;
    },
      err => {
        this.errormsg = err.error;
            alert(this.errormsg);
      });
  }

}
