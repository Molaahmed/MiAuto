import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

export interface BackendCar {
    user_id: number;
    vin_number: string;
    plate: string;
    type: string
    fuel: string;
    make: string;
    model: string;
    engine: string;
    gear_box: string;
    air_conditioner: number;
    color: string;
}

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

    createCar(car: BackendCar) {
        return axios.post(API_URL + 'cars/create', car, { headers: { "Authorization": `Bearer ${Token}` } });
    }
}