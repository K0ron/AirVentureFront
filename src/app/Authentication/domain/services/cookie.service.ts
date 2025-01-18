import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly TOKEN_KEY = 'token';

  setCookie(token: string, expirationDays: number = 1): void {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${this.TOKEN_KEY}=${token};${expires};path=/;SameSite=Lax`;
  }

  getCookie(): string | null {
    const name = this.TOKEN_KEY + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let cookie of cookieArray) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  deleteCookie(): void {
    document.cookie = `${this.TOKEN_KEY}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  isLoggedIn(): boolean {
    return !!this.getCookie();
  }
}
