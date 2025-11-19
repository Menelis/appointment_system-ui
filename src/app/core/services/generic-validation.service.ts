import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenericValidationService {

  constructor() { }

  /**
   * Returns true if the form control has error.
   * @param formGroup Form group
   * @param controlName Form Control Name
   * @param errorName Error name
   */
  hasError = (formGroup: FormGroup, controlName: string, errorName: string) => {
    return formGroup.controls[controlName].hasError(errorName);
  }

  validateControl = (formGroup: FormGroup, controlName: string) => {
    return formGroup.controls[controlName]?.invalid && formGroup.controls[controlName]?.touched;
  }

  matchValidator = (controlName: string, matchingControlName: string): ValidatorFn  => {
    return (formGroup: AbstractControl) : Validators | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if(!control || !matchingControl) {
        return null;
      }
      if(matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch:  true };
      }
      matchingControl.setErrors(null);
      return null;
    }
  }
}
