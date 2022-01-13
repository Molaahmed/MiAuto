import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

@Injectable({
    providedIn: 'root'
})
export class GarageService {

    getGarageId() {
        return axios
            .get(API_URL + 'garage/id', { headers: { "Authorization": `Bearer ${Token}` } });
    }
}
