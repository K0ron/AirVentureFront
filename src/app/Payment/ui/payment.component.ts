import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Activity,
  ActivityControllerService,
  PaymentControllerService,
  PreReservation,
  PreReservationControllerService,
} from '../../Swagger/configurations';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { environmentProd } from '../../../../environments/environment-prod';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [
    PaymentControllerService,
    PreReservationControllerService,
    ActivityControllerService,
    DatePipe,
  ],
})
export class PaymentComponent implements OnInit {
  preReservation: PreReservation = {};
  activity: Activity = {};
  totalPrice: number | undefined = 0;
  activityId: number | undefined = 0;
  imgUrls: string[] = [];
  numberOfParticipants: number | undefined = 0;
  activityDate: string | null = null;
  stripe!: Stripe | null;
  card: any;
  clientSecret!: string;

  constructor(
    private payementService: PaymentControllerService,
    private preReservationService: PreReservationControllerService,
    private activityService: ActivityControllerService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  async ngAfterViewInit() {
    this.stripe = await loadStripe(environmentProd.stripePublicKey);
    const elements = this.stripe!.elements();
    this.card = elements.create('card');
  }

  ngOnInit(): void {
    this.getActivityFromStotage();
    let idParam = this.route.snapshot.paramMap.get('id');
    const preReservationId = idParam ? +idParam : null;

    if (preReservationId) {
      this.preReservationService
        .getOnePreReservation(preReservationId)
        .subscribe((preReservation) => {
          this.totalPrice = preReservation.totalPrice;
          this.numberOfParticipants = preReservation.participants;
          this.activityDate = this.datePipe.transform(preReservation.dateOfActivity, 'dd/MM/yyyy');
        });
    }
  }

  getActivityFromStotage(): void {
    const activityId = +localStorage.getItem('activityId')!;
    this.activityService.getOne(activityId).subscribe((activity) => {
      this.activity = activity;

      this.activityService.getActivityPictures(activityId).subscribe({
        next: (pictures) => {
          const activityWithPicture = { ...activity, pictures };
          this.activity = activityWithPicture;
          this.imgUrls = pictures;
        },
      });
    });
  }

  goToPayment() {
    let idParam = this.route.snapshot.paramMap.get('id');
    const preReservationId = idParam ? +idParam : null;

    if (preReservationId) {
      this.payementService.createCheckoutSession(preReservationId).subscribe({
        next: (response: any) => {
          if (response && response.url) {
            window.location.href = response.url; // Redirige vers Stripe Checkout
          } else {
            console.error('Aucune URL Stripe reçue');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la création de la session Stripe :', error);
        },
      });
    } else {
      console.error('Pre-reservation not found');
    }
  }

  // confirmPayment() {
  //   this.stripe!.confirmCardPayment(this.clientSecret, {
  //     payment_method: {
  //       card: this.card,
  //     },
  //   }).then((result) => {
  //     if (result.error) {
  //       console.error('Erreur de paiement: ', result.error.message);
  //     } else {
  //       console.log('Paiement réussi !', result.paymentIntent);
  //       alert('Paiement réussi !');
  //     }
  //   });
  // }
}
