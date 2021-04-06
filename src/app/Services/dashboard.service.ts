import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private registeredEvents = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getDashboardRegisteredEvents(): void {
    // tslint:disable-next-line: deprecation
    this.http.get<{message: string, result: any}>(`${environment.backendURL}/api/eventActivity/dashboard/events`).subscribe((response) => {
      this.registeredEvents.next(response.result);
      console.log(response);
    });
  }

  getUpdatedDashboardRegisteredEvents(): any {
    return this.registeredEvents.asObservable();
  }
}
