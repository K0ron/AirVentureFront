import { Component, OnInit } from '@angular/core';
import { CardComponent } from './component/card/card.component';
import { CommonModule } from '@angular/common';
import { Activity, ActivityControllerService } from '../../Swagger/configurations';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public activities: Activity[] = [];

  constructor(private activityService: ActivityControllerService, private router: Router) {}

  ngOnInit(): void {
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
    });
  }
}
