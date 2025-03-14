import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showWarningAlert(message: string) {
    Swal.fire({
      title: 'Attention ⚠️',
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
      position: 'top',
      timer: 3000,
    });
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      title: 'Succès 🚀',
      text: message,
      icon: 'success',
      confirmButtonText: 'Super !',
      position: 'top',
      timer: 3000,
    });
  }

  showErrorAlert(message: string) {
    Swal.fire({
      title: 'Erreur 🚨',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      position: 'top',
      timer: 3000,
    });
  }
}
