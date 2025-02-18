import { AbstractControl,ValidationErrors,ValidatorFn } from "@angular/forms";

export function alphabetsValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
        const value=control.value;
        if(!value)return null;
        const valid =/^[A-Za-z]+(?:[A-Za-z]+)*$/.test(value);
        return valid?null:{alphabetsOnly:true};
    };
};

export function emailValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
        const value = control.value;
        if(!value){
            return null;
        }
        const emailPattern=/^(?!.*[@.]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const startsOrEndsWithInvalid = /^[.@]|[.@]$/.test(value);
        const containsMultipleAtSigns = (value.match(/@/g) || []).length > 1;

        if (
            !emailPattern.test(value) ||
            startsOrEndsWithInvalid ||
            containsMultipleAtSigns
          ) {
            return { email: true };
          };
          return null;
    };
};

export function passwordValidator():ValidatorFn {
    return (control:AbstractControl):ValidationErrors | null =>{
        if(!control.value && !control.value.length)return null;
        const value=control.value || '';
        const hasUppercaseLetter : boolean = /[A-Z]/.test(value);
        const hasLowerCaseLetter : boolean = /[a-z]/.test(value);
        const hasNumber : boolean = /\d/.test(value);
        const hasSymbol : boolean = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasMinimumLength : boolean = value.length >= 8;

        const isValid= hasUppercaseLetter && hasLowerCaseLetter && hasNumber && hasSymbol && hasMinimumLength
        return isValid ? null : { strongPassword: true };
    }
}

export function passwordMatchValidator (group:AbstractControl):ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
}


export function repeateCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const repeatedChars = /(.)\1/.test(value);
      return repeatedChars ? { repeatedCharacters: true } : null;
    };
}


export function spacesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && !control.value.length) {
        return null;
      }
      const isFullSpaces =
        control.value != null && control.value.trim().length === 0;
      return isFullSpaces ? { fullSpaces: true } : null;
    };
}



export function mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && !control.value.length) {
        return null;
      }
      const valid = /^[0-9]{10}$/.test(control.value);
      return valid ? null : { invalidMobile: true };
    };
}



export function onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length === 0) {
        return null;
      }
      const valid = /^[0-9]+$/.test(control.value);
      return valid ? null : { onlynumbers: true };
    };
}



export function otpPattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length === 0) {
        return null;
      }
      const valid = /^[0-9]+$/.test(control.value);
      return valid ? null : { pattern: true };
    };
  }