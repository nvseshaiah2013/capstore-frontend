import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css']
})
export class AddMerchantComponent implements OnInit {
  addForm: FormGroup
  submitted: boolean = false;
  username: string
  usernameErrorMessage: string;
  usernameFlag: boolean = false;
  phoneNo: string;
  phoneNoErrorMessage: string;
  phoneNoFlag: boolean = false;
  alternatePhoneNo: string;
  alternatePhoneNoErrorMessage: string;
  alternatePhoneNoFlag: boolean = false;
  alternateEmail: string;
  alternateEmailFlag: boolean = false;
  alternateEmailErrorMessage: string;

  securityQuestion = [
    "Your High School Best Friend? ",
    "Who was your childhood hero? ",
    "In what town or city did your parents meet? ",
    "In what town or city was your first full time job? ",
    "What is your spouse or partner's mother's maiden name? "
  ]

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,private route:Router) {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$")]],
      username: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      alternatePhoneNo: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      alternateEmail: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required, Validators.pattern("[A-Z][a-z]{2,6}")]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: ['', Validators.required],
      district: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$")]],
      state: ['', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$")]],
      landmark: ['', Validators.required],

    })


  }

  ngOnInit() {
  }
  addMerchant() {
    this.submitted = true;
    if (this.addForm.invalid)
      return;
    this.phoneNo = this.addForm.controls.phoneNo.value
    this.alternatePhoneNo = this.addForm.controls.alternatePhoneNo.value
    this.username = this.addForm.controls.username.value
    this.alternateEmail = this.addForm.controls.alternateEmail.value

    this.adminService.checkPhoneNo(this.phoneNo).subscribe(data => {
      this.phoneNoFlag = false;
      this.alternatePhoneNoFlag = false
      this.usernameFlag = false;
      this.alternateEmailFlag = false;
    }, (err: HttpErrorResponse) => {
      this.phoneNoFlag = true;
      this.phoneNoErrorMessage = err.error.message
    })

    this.adminService.checkPhoneNo(this.alternatePhoneNo).subscribe(data => {
      this.phoneNoFlag = false;
      this.alternatePhoneNoFlag = false
      this.usernameFlag = false;
      this.alternateEmailFlag = false;
    }, (err: HttpErrorResponse) => {
      this.alternatePhoneNoFlag = true;
      this.alternatePhoneNoErrorMessage = err.error.message
    })

    this.adminService.checkValidEmail(this.username).subscribe(data => {
      this.phoneNoFlag = false;
      this.alternatePhoneNoFlag = false
      this.usernameFlag = false;
      this.alternateEmailFlag = false;
    }, (err: HttpErrorResponse) => {
      this.usernameFlag = true;
      this.usernameErrorMessage = err.error.message
    })

    this.adminService.checkValidEmail(this.alternateEmail).subscribe(data => {
      if(  this.phoneNoFlag ==false && this.alternatePhoneNoFlag == false && this.usernameFlag == false&& this.alternateEmailFlag == false)
      {
      this.adminService.addMerchant(this.addForm.value).subscribe(data=>
        {
          alert("Merchant Added")
          this.route.navigate(['/admin/all-merchant'])
        })
        this.phoneNoFlag = false;
      this.alternatePhoneNoFlag = false
      this.usernameFlag = false;
      this.alternateEmailFlag = false;
        }
    }, (err: HttpErrorResponse) => {
      this.alternateEmailFlag = true;
      this.alternateEmailErrorMessage = err.error.message
    })
  }

}
