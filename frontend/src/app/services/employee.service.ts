import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    getAllByGarageId(id: Number) {
        //getting all the employees working on the garage by id
        return axios.get(API_URL + 'employees/' + id, { headers: { "Authorization": `Bearer ${Token}` } })
    }
}
