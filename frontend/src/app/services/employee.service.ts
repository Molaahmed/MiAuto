import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

const EMPLOYEE_API = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    getAll(token: string) {
        //getting the garage id
        let id = axios.get(EMPLOYEE_API + 'garage/id', { headers: { "Authorization": `Bearer ${token}` } })
        console.log(id);

        //getting all the employees working on the garage by id
        return axios.get(EMPLOYEE_API + 'employees/' + id, { headers: { "Authorization": `Bearer ${token}` } })
    }
}
