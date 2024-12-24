import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestDto } from '../dto/login-request.dto';
import { Observable } from 'rxjs';


export interface UserIdDTO {
  id: String;
}

@Injectable()
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080'

  constructor(
    private httpClient: HttpClient
  ) {}


  login(user: LoginRequestDto): Observable<UserIdDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<UserIdDTO>(`${this.apiUrl}/login`, user, {
      headers,
      withCredentials: true
    });
  }


}
