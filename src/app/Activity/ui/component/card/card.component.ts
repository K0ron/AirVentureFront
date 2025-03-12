import { ActivityControllerService } from './../../../../Swagger/api/activityController.service';
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../../../Swagger/configurations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [ActivityControllerService],
})
export class CardComponent {
  @Input() activity!: Activity;

  constructor(private router: Router) {}

  onCardClick(id: number | undefined) {
    this.router.navigate(['/reservation', id]);
  }
}
