import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  activities = new Subject<any>();
  activityById = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getActivity(): void {
    console.log('entered');
    // tslint:disable-next-line: deprecation
    this.http.get<{message: string, result: any, route: any}>(`${environment.backendURL}/api/strava`).subscribe((response) => {
      console.log(response);
      this.activities.next(response.result);
    });
  }

  getUpdatedActivity(): any {
    return this.activities.asObservable();
  }

  getStravaActivityById(id): void {
    // tslint:disable-next-line: deprecation
    this.http.get<{message: string, result: any, route: any}>(`${environment.backendURL}/api/strava/${id}`).subscribe((response) => {
      this.activityById.next(response.result);
      console.log(response);
    });
  }

  getUpdatedActivityById(): any {
    return this.activityById.asObservable();
  }
}
