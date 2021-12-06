import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {
    transformPhoneNumber(event: any): string {
        let value = (event.target as HTMLInputElement).value;

        if (value != null) {
            if ((value.length == 1 || value.length == 5) && event.key != 'Backspace') {
                value += '\xa0';
            }
            else if (value.length == 11 && event.key != 'Backspace') {
                let newValue = value.replace(/\s/g, "");

                newValue = newValue.substring(0, 2) + '\xa0' + newValue.substring(2, newValue.length);
                newValue = newValue.substring(0, 6) + '\xa0' + newValue.substring(6, newValue.length);

                value = newValue;
            }
        }
        return value;
    }
}