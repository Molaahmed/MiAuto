import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    getAll() {
        //getting all the users
        return axios.get(API_URL + 'users', { headers: { "Authorization": `Bearer ${Token}` } });
    }
}