import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ActivityControllerService } from './api/activityController.service';
import { AuthenticationControllerService } from './api/authenticationController.service';
import { FinalReservationControllerService } from './api/finalReservationController.service';
import { PaymentControllerService } from './api/paymentController.service';
import { PreReservationControllerService } from './api/preReservationController.service';
import { ReviewControllerService } from './api/reviewController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ActivityControllerService,
    AuthenticationControllerService,
    FinalReservationControllerService,
    PaymentControllerService,
    PreReservationControllerService,
    ReviewControllerService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
