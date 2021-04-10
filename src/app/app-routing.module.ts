import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth Gaurd
import { AuthGuard } from './Guard/auth-guard';

// Components
import { LoginComponent } from './Components/Auth/login/login.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { QueryParamsComponent } from './Components/Dashboard/query-params/query-params.component';
import { EventsComponent } from './Components/Events/events/events.component';
import { EventDetailsComponent } from './Components/Events/event-details/event-details.component';
import { StravaComponent } from './Components/Strava/strava/strava.component';
import { StravaActivityDetailsComponent } from './Components/Strava/strava-activity-details/strava-activity-details.component';
import { PaymentComponent } from './Components/Payments/payment/payment.component';
import { PaymentconfirmationComponent } from './Components/Payments/paymentconfirmation/paymentconfirmation.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: QueryParamsComponent
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'strava',
    component: StravaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'strava/:id',
    component: StravaActivityDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'checkout',
    component:PaymentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'confirmation',
    component:PaymentconfirmationComponent,
    canActivate:[AuthGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
