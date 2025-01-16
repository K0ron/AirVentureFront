import { Component, OnInit } from '@angular/core';
import { CardComponent } from './component/card/card.component';
import { CommonModule } from '@angular/common';
import { Activity, ActivityControllerService } from '../../Swagger/configurations';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { SearchCategoriesComponent } from './component/search-categories/search-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, SearchCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public activities: Activity[] = [];
  showFilter: boolean = false;
  titleCategory: string = '';
  filtredActivities = [...this.activities];

  constructor(private activityService: ActivityControllerService, private router: Router) {}

  ngOnInit(): void {
    this.showFilter = false;
    console.log('filter= ', this.showFilter);

    console.log('LOG TEST');

    this.activityService.getAll().subscribe((data) => {
      const activitiesWithPictures$ = data.map((activity) =>
        this.activityService
          .getActivityPictures(activity.id!)
          .pipe(map((pictures) => ({ ...activity, pictures })))
      );

      forkJoin(activitiesWithPictures$).subscribe({
        next: (enrichedActivities) => {
          this.activities = enrichedActivities;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des activités ou des images :', err);
        },
      });
      console.log('LOGS ', data);
    });
  }

  getActivitiesByCategory(catgory: string): void {
    this.activityService.getActivitiesByCategory(catgory).subscribe((data) => {
      const activitiesWithPictures$ = data.map((activity) =>
        this.activityService
          .getActivityPictures(activity.id!)
          .pipe(map((pictures) => ({ ...activity, pictures })))
      );
      forkJoin(activitiesWithPictures$).subscribe({
        next: (enrichedActivities) => {
          this.activities = enrichedActivities;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des activités ou des images :', err);
        },
      });
      console.log('Activities By category ', data);
    });
  }

  onCategorySelected(category: string | null): void {
    console.log('Catégorie sélectionnée:', category);
    if (category) {
      this.filtredActivities = this.activities.filter((activity) => activity.category === category);
      this.showFilter = true;
      console.log('filter= ', this.showFilter);
      this.titleCategory = category;
      console.log('CATEG = ', this.titleCategory);
    } else {
      this.showFilter = false;
      console.log('filter= ', this.showFilter);
    }
    console.log('Activités filtrées:', this.filtredActivities);
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
