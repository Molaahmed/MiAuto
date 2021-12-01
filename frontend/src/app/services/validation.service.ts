import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    isDateValid(dob: any): boolean {
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
}