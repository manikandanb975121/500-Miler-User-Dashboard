import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';

// Google Map
import { AgmCoreModule } from '@agm/core';

// HTTP Modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NbThemeModule,
         NbLayoutModule,
         } from '@nebular/theme';

import {
          NbCardModule,
          NbSidebarModule,
          NbMenuModule,
          NbButtonModule,
          NbListModule,
          NbActionsModule,
          NbIconModule,
          NbToggleModule,
          NbCheckboxModule,
          NbAlertModule,
          NbInputModule,
          NbDatepickerModule,
          NbDialogModule,
          NbTooltipModule,
          NbStepperModule,
          NbProgressBarModule,
          NbTabsetModule,
          NbTimepickerModule,
          NbUserModule,
          NbAccordionModule,
          NbToastrModule,
          NbSelectModule,
        } from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './Components/Auth/login/login.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { QueryParamsComponent } from './Components/Dashboard/query-params/query-params.component';
import { EventsComponent } from './Components/Events/events/events.component';
import { EventsListComponent } from './Components/Events/events-list/events-list.component';
import { AuthInterceptor } from './Services/auth-interceptor';
import { EventDetailsComponent } from './Components/Events/event-details/event-details.component';
import { StravaComponent } from './Components/Strava/strava/strava.component';
import { StravaActivityListComponent } from './Components/Strava/strava-activity-list/strava-activity-list.component';
import { StravaActivityDetailsComponent } from './Components/Strava/strava-activity-details/strava-activity-details.component';

// Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { DashboardEventsComponent } from './Components/Dashboard/dashboard-events/dashboard-events.component';
import { PaymentComponent } from './Components/Payments/payment/payment.component';
import { PaymentService } from './Services/payment.service';
import { PaymentconfirmationComponent } from './Components/Payments/paymentconfirmation/paymentconfirmation.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    QueryParamsComponent,
    EventsComponent,
    EventsListComponent,
    EventDetailsComponent,
    StravaComponent,
    StravaActivityListComponent,
    StravaActivityDetailsComponent,
    DashboardEventsComponent,
    PaymentComponent,
    PaymentconfirmationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbToggleModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0ZHAbLPFBgSXFuC20XytY1xRSWYVk6O8'
    }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,
    NbActionsModule,
    NbAccordionModule,
    NbCardModule,
    MatDialogModule,
    MatSelectModule,
    NbIconModule,
  ],
  providers: [PaymentService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
