import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Activity,
  ActivityControllerService,
  PreReservationControllerService,
} from '../../Swagger/configurations';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [DividerModule, DatePickerModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe, PreReservationControllerService],
})
export class ReservationComponent implements OnInit {
  activity: Activity = {};
  selectedDate: Date = new Date();
  maxParticipants: number | undefined = 1;
  participantsOptions: number[] = [];
  imgUrls: string[] = [];
  reservationForm: FormGroup;
  totalPrice: number | undefined = 0;
  selectedParticipants: number | undefined = 0;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityControllerService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private preReservationService: PreReservationControllerService,
    private router: Router
  ) {
    this.reservationForm = this.formBuilder.group({
      dateOfActivity: [this.selectedDate, Validators.required],
      numberOfParticipants: [this.selectedParticipants, Validators.required],
      totalPrice: [this.totalPrice, Validators.required],
      reservedAt: [new Date(), Validators.required],
      status: ['PENDING', Validators.required],
      expirationDate: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectedActivity();
  }

  getFormattedDate(): string {
    console.log('SELECTED DATE', this.selectedDate);
    return this.datePipe.transform(this.selectedDate, 'dd/MM/yyyy') || '';
  }

  selectedActivity() {
    let idParam = this.route.snapshot.paramMap.get('id');
    const activityId = idParam ? +idParam : null;

    if (activityId) {
      this.activityService.getOne(activityId).subscribe((activity) => {
        this.maxParticipants = activity.maxParticipants ?? 0;
        this.totalPrice = activity.price;
        this.participantsOptions =
          this.maxParticipants > 0
            ? Array.from({ length: this.maxParticipants }, (_, i) => i + 1)
            : [];
        this.activityService.getActivityPictures(activityId).subscribe({
          next: (pictures) => {
            const activityWithPicture = { ...activity, pictures };
            this.activity = activityWithPicture;
            this.imgUrls = pictures;
            console.log('Current activity ', activityWithPicture);
            console.log('Current pictures ', pictures);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des images :', err);
          },
        });
      });
    }
  }

  openGoogleMaps(
    adress: string | undefined,
    zipCode: string | undefined,
    city: string | undefined
  ) {
    const formattedAddress = encodeURIComponent(`${adress}, ${zipCode} ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}`, '_blank');
  }

  onDateSelect(event: any): void {
    this.selectedDate = event.value;
  }

  calculateTotalPrice(): void {
    if (this.selectedParticipants !== undefined) {
      this.totalPrice = this.selectedParticipants * this.activity.price!;
      console.log(this.totalPrice);
    } else {
      this.totalPrice = 0;
      console.log('Nombre de participants non sélectionné');
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.calculateTotalPrice();
      this.reservationForm.patchValue({
        dateOfActivity: this.selectedDate,
        numberOfParticipants: this.selectedParticipants,
        totalPrice: this.totalPrice,
        reservedAt: new Date(),
        status: 'PENDING',
      });
      const reservationDate = this.reservationForm.value;

      console.log('Form submitted : ', reservationDate);

      this.preReservationService.createPreReservation(reservationDate).subscribe(
        (response) => {
          console.log('Pre-reservation created : ', response);
        },
        (error) => {
          console.error('Error creating pre-reservation : ', error);
        }
      );
      this.router.navigate(['payment']);
    } else {
      console.log('Form is invalid');
      console.log('FORM VALUE', this.reservationForm.value);
    }
  }
}
