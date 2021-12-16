import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

@Injectable({
    providedIn: 'root'
})
export class CarService {

    getAll() {
        return axios.get(API_URL + 'cars', { headers: { "Authorization": `Bearer ${Token}` } });
    }
    
    getAllByClientId(clientId: Number) {
        return axios.get(API_URL + 'garage/client/cars/' + clientId, { headers: { "Authorization": `Bearer ${Token}` } });
    }
}