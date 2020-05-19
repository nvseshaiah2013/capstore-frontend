import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { JwtClientService } from '../../services/jwt-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  authRequest: any;

  response: any;
  constructor(private formBuilder: FormBuilder, private service: JwtClientService,private router:Router) {


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]]
    })

  }

  public getAccessToken(authRequest) {

    let resp = this.service.generateToken(authRequest);
    resp.subscribe(data => {
      localStorage.token = data;
      let role = jwt_decode(data)['jti'];
      // console.log(role);
      if(role == 'ROLE_CUSTOMER'){
        this.router.navigate(['customer','home']);
      }
      else if(role == 'ROLE_ADMIN'){
        this.router.navigate(['admin','home'])
      }
      else if(role == 'ROLE_MERCHANT'){
        this.router.navigate(['merchant','home']);
      }
    },(err:HttpErrorResponse)=>{console.log(err)});
  }

  test() {
    this.accessApi(localStorage.token);
  }
  public accessApi(token) {
    let resp = this.service.welcome(token);
    resp.subscribe(data => {
      this.response = data;
      // alert(this.response);
      localStorage.token = token;
      var decoded = jwt_decode(token);
      // console.log(decoded);
      var role = decoded['jti'];
      // console.log(role);
      if (role == 'ROLE_CUSTOMER') {
        console.log('navigate to customer');
      }
      else {
        console.log('navigate to merchant');
      }

    }, (err: HttpErrorResponse) => {
      this.response = err;
      alert(this.response);
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;
    // console.log(this.loginForm.value)
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;
    this.authRequest = {
      "userName": username,
      "password": password
    };
    this.getAccessToken(this.authRequest);
  }

}
