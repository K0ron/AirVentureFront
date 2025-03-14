import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../domain/services/cookie.service';
import Swal from 'sweetalert2';
import { AlertService } from '../../Shared/services/alert.service';

export const AuthGuard: CanActivateFn = (): boolean => {
  const cookieService = inject(CookieService);
  const router: Router = inject(Router);
  const alertService = inject(AlertService);
  const token = cookieService.getCookie();
  if (!token) {
    alertService.showWarningAlert(
      'Vous devez vous connecter ou vous enregistrer pour accéder à cette page'
    );
    router.navigate(['/home']);
    return false;
  }
  return true;
};
