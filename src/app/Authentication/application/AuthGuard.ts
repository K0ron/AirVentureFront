import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../domain/services/cookie.service';
import Swal from 'sweetalert2';

export const AuthGuard: CanActivateFn = (): boolean => {
  const cookieService = inject(CookieService);
  const router: Router = inject(Router);
  const token = cookieService.getCookie();
  if (!token) {
    Swal.fire({
      title: 'Accès restreint',
      text: 'Vous devez vous connecter ou vous enregistrer pour accéder à cette page',
      icon: 'warning',
      confirmButtonText: 'OK',
      position: 'top',
      timer: 3000,
      toast: true,
      showConfirmButton: true,
      customClass: {
        title: 'custom-title',
        popup: 'custom-popup',
      },
      background: 'rgba(69, 96, 84, 1)',
      color: 'rgba(255, 255, 255, 1)',
    });

    router.navigate(['/home']);
    return false;
  }
  return true;
};
