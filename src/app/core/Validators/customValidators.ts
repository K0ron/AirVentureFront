import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()\-_=+\{\}\[\]|\\:;\"'<>,.?\/]/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return !valid ? { passwordStrength: { value } } : null;
  };
}

export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): { [key: string]: any } | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };
}

export function emailExistingValidator(existingEmails: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const exist = existingEmails.includes(value);
    return exist ? { emailExists: { value } } : null;
  };
}
