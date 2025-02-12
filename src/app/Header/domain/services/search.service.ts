import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private seachNameSubject = new Subject<string>();
  private seachCitySubject = new Subject<string>();

  searchName$ = this.seachNameSubject.asObservable();
  searchCity$ = this.seachCitySubject.asObservable();

  searchName(query: string) {
    this.seachNameSubject.next(query);
  }

  searchCity(query: string) {
    this.seachCitySubject.next(query);
  }
}
