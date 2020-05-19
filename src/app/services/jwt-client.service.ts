import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient: HttpClient) { }


  public generateToken(request) {
    return this.httpClient.post<string>("http://localhost:8083/authenticate", request, { responseType: 'text' as 'json' });
  }

  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:8083/Welcome", { headers, responseType: 'text' as 'json' });
  }

  getRole(token){
      let role = jwt_decode(token)['jti'];
      return role;
  }

  isTokenExpired(token){
    let exp = jwt_decode(token)['exp'];
    return exp > Date.now();
  }
}
