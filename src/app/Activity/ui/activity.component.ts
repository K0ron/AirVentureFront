import { SearchService } from './../../Header/domain/services/search.service';
import { Component, OnInit } from '@angular/core';
import { ActivityControllerService } from '../../Swagger/api/activityController.service';
import { Activity } from '../../Swagger/models/activity';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CardComponent } from './component/card/card.component';
import { CommonModule } from '@angular/common';
import { SearchCategoriesComponent } from './component/search-categories/search-categories.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CardComponent, CommonModule, SearchCategoriesComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit {
  public allActivities: Activity[] = [];
  public filtredActivities: Activity[] = [];
  public showFilter: boolean = false;
  public titleCategory: string = '';
  public imgUrls: string[] = [];

  constructor(
    private activityService: ActivityControllerService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    this.searchService.searchName$.subscribe((searchQuery: string) => {
      this.filterActivities(searchQuery);
    });
    console.log('Activities loaded');

    this.searchService.searchCity$.subscribe((searchQuery: string) => {
      this.filterActivities(searchQuery);
    });
  }

  private loadActivities(): void {
    this.activityService.getAll().subscribe((data) => {
      const activitiesWithPictures$ = data.map((activity) =>
        this.activityService.getActivityPictures(activity.id!).pipe(
          map((pictures) => ({
            ...activity,
            pictures,
          }))
        )
      );
      forkJoin(activitiesWithPictures$).subscribe({
        next: (enrichedActivities) => {
          this.allActivities = enrichedActivities;
          this.filtredActivities = [...this.allActivities];
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des activités ou des images :', err);
        },
      });
    });
  }

  private filterActivities(nameQuery?: string | null, cityQuery?: string | null): void {
    const filtered = this.allActivities.filter((activity) => {
      const matchesName = nameQuery
        ? activity.name?.toLocaleLowerCase().includes(nameQuery.toLocaleLowerCase())
        : true;
      const macthesCity = cityQuery
        ? activity.city?.toLocaleLowerCase().includes(cityQuery.toLocaleLowerCase())
        : true;
      return matchesName && macthesCity;
    });

    this.filtredActivities = filtered;
    this.filtredActivities = filtered;

    this.noActivitiesMessage =
      this.filtredActivities.length === 0 ? 'Aucune Activité ne correspond à votre recherche' : '';
  }

  onCategorySelected(category: string | null): void {
    if (category) {
      this.filtredActivities = this.allActivities.filter(
        (activity) => activity.category === category
      );
      this.showFilter = true;
      this.titleCategory = category;
    } else {
      this.showFilter = false;
    }

    this.checkedActivities();
  }

  noActivitiesMessage: string = '';
  checkedActivities(): void {
    if (this.filtredActivities.length == 0) {
      this.noActivitiesMessage = 'Aucune Activité disponible dans cette catégorie';
    } else {
      this.noActivitiesMessage = '';
    }
  }
}
