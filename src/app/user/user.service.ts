import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = 'http://localhost:8083/';

  constructor(private router: Router,private http:HttpClient) { }
  logOutUser() {
    if (localStorage.token != null) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.router.navigate(['/home']);
    }
  }

  registerNewUser(user: User) {
    return this.http.post(this.baseUrl + 'addUser', user, { responseType: 'text' as 'json' });
  }
}
