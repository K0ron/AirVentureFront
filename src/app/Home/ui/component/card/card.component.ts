import { ActivityControllerService } from './../../../../Swagger/api/activityController.service';
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../../../Swagger/configurations';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [ActivityControllerService],
})
export class CardComponent {
  @Input() activity!: Activity;
}
