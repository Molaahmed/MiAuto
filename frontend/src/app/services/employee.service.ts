import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

export interface BackendEmployee {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    phone_number: string;
    email: string;
    garage_id: number;
    role: number;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    getAllByGarageId(id: Number) {
        //getting all the employees working on the garage by id
        return axios.get(API_URL + 'employees/' + id, { headers: { "Authorization": `Bearer ${Token}` } });
    }

    createEmployee(employee: BackendEmployee) {
        return axios.post(API_URL + 'employee/create', employee, { headers: { "Authorization": `Bearer ${Token}` } });
    }

    updateEmployee(id: Number, employee: BackendEmployee) {
        return axios.put(API_URL + 'employee/update/' + id, employee, { headers: { "Authorization": `Bearer ${Token}` } });
    }
}
