import { Injectable } from '@angular/core';

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

export class GenerateCarService {

    generateCar(userId: number, vin: string) : BackendCar {
        let car: BackendCar = {
            user_id: userId,
            vin_number: vin,
            plate: "ABC-123",
            type: "SUV",
            fuel: "electric",
            make: "Renault",
            model: "Twingo",
            engine: "Grande",
            gear_box: "manuel",
            air_conditioner: 1,
            color: "white"
        }
        return car;
    }
}