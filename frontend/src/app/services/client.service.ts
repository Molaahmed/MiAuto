import { Injectable } from '@angular/core';
import axios from 'axios';

const API_URL = 'https://mi-auto-db-jbp5o.ondigitalocean.app/api/';

const Token = localStorage.getItem('session');

export interface BackendClient {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    phone_number: string;
    email: string;
    garage_id: number;
}

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    getAll() {
        //getting all the users
        return axios.get(API_URL + 'users', { headers: { "Authorization": `Bearer ${Token}` } });
    }

    createClient(client: BackendClient) {
        return axios.post(API_URL + 'client/create', client, { headers: { "Authorization": `Bearer ${Token}` } });
    }

    updateClient(id: Number, client: BackendClient) {
        return axios.put(API_URL + 'garage/client/update/' + id, client, { headers: { "Authorization": `Bearer ${Token}` } });
    }
}