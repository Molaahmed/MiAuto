import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const Token = localStorage.getItem('session');
;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  user(){
    return axios.get(API_URL + 'user',{ headers: {"Authorization" : `Bearer ${Token}`} });
  }

}
