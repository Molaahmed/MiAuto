import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    isDateOfBirthValid(dob: any): boolean {
        let regExp = /[\d][\d]?\/[\d][\d]?\/(19|20)[\d][\d]/g;

        if (regExp.test(dob)) {
            return true;
        }
        return false;
    }

    isOverEighteen(dob: any): boolean {
        let timeDifference = Math.abs(Date.now() - new Date(dob).getTime());
        let age = Math.floor(timeDifference / (1000 * 3600 * 24) / 365.25);

        if (age >= 18) {
            return true;
        }
        return false;
    }

    isAppointmentDateValid(date: any): boolean {
        let regExp = /[\d][\d]?\/[\d][\d]?\/(20)[\d][\d]/g;

        if (regExp.test(date)) {
            return true;
        }
        return false;
    }

    isAppointmentInTheFuture(date: any): boolean {
        if (new Date(date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) {
            return true;
        }
        return false;
    }

    areTimesValid(startingTime: any, endingTime: any): boolean {
        let hoursStartingTime = Number(startingTime.split(":")[0]);
        let minutesStartingTime = Number(startingTime.split(":")[1]);

        let hoursEndingTime = Number(endingTime.split(":")[0]);
        let minutesEndingTime = Number(endingTime.split(":")[1]);

        if (hoursStartingTime < hoursEndingTime) {
            return true;
        }
        else if (hoursStartingTime == hoursEndingTime && minutesStartingTime < minutesEndingTime) {
            return true;
        }
        else {
            return false;
        }
    }
}