import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

const AUTH_API = 'http://127.0.0.1:80/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return axios.post(AUTH_API + 'login',{
      email,
      password
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    });
  }

  logout() {
    return this.http.post(AUTH_API + 'logout',[]);
  }
}
