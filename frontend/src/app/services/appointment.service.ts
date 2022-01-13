import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

export interface BackendAppointment {
    id: number;
    user_id: number;
    garage_id: number;
    vin_number: string;
    description: string;
    date: string;
    startingTime: string;
    endingTime: string;
}

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    getAllByGarageId(id: Number) {
        //getting all the employees working on the garage by id
        return axios.get(API_URL + 'reservations/' + id, { headers: { "Authorization": `Bearer ${Token}` } });
    }

    createAppointment(appointment: BackendAppointment) {
        return axios.post(API_URL + 'reservation', appointment, { headers: { "Authorization": `Bearer ${Token}` } });
    }

    updateAppointment(appointment: BackendAppointment) {
        return axios.post(API_URL + 'reservations/update', appointment, { headers: { "Authorization": `Bearer ${Token}` } });
    }
}