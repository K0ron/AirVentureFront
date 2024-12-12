export * from '../api/activityController.service';
import { ActivityControllerService } from '../api/activityController.service';
export * from '../api/authenticationController.service';
import { AuthenticationControllerService } from '../api/authenticationController.service';
export * from '../api/finalReservationController.service';
import { FinalReservationControllerService } from '../api/finalReservationController.service';
export * from '../api/paymentController.service';
import { PaymentControllerService } from '../api/paymentController.service';
export * from '../api/preReservationController.service';
import { PreReservationControllerService } from '../api/preReservationController.service';
export * from '../api/reviewController.service';
import { ReviewControllerService } from '../api/reviewController.service';
export * from '../api/userController.service';
import { UserControllerService } from '../api/userController.service';
export const APIS = [ActivityControllerService, AuthenticationControllerService, FinalReservationControllerService, PaymentControllerService, PreReservationControllerService, ReviewControllerService, UserControllerService];
