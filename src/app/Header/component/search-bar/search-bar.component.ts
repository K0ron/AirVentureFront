import { Component, Output, EventEmitter } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../domain/services/search.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [DividerModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  public enteredActivityNameValue: string = '';
  public enteredCityValue: string = '';
  private searchNameSubject = new Subject<string>();
  private searchCitySubject = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchNameSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchQuery) => {
        this.searchService.searchName(searchQuery);
      });

    this.searchCitySubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchQuery) => {
        this.searchService.searchCity(searchQuery);
      });
  }

  onSearchActivityByName(): void {
    this.searchNameSubject.next(this.enteredActivityNameValue);
  }

  onSearchActivityByCity(): void {
    this.searchCitySubject.next(this.enteredCityValue);
  }
}
