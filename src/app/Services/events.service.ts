import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events = new Subject<any>();
  private eventsById = new Subject<any>();
  private registeredEvents = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }

  getEvents(): void {
    console.log('Entered');
    // tslint:disable-next-line: deprecation
    this.http.get<{ message: string, result: any}>(`${environment.backendURL}/api/usersEvent`).subscribe((response) => {
      this.events.next(response.result);
      console.log(response);
    });
  }

  getUpdatedEvents(): any {
    return this.events.asObservable();
  }

  getEventsById(id): void {
    // tslint:disable-next-line: deprecation
    this.http.get<{ message: string, result: any}>(`${environment.backendURL}/api/usersEvent/${id}`).subscribe((response) => {
      this.eventsById.next(response.result);
      console.log(response);
    });
  }

  getUpdatedEventsById(): any {
    return this.eventsById;
  }

  registerEvent(data): any {
    // tslint:disable-next-line: deprecation
    this.http.post(`${environment.backendURL}/api/usersEvent/register`, data).subscribe((response) => {
      console.log(response);
    });
  }

  getRegisteredEvents(id): void {
    console.log('get');
    // tslint:disable-next-line: deprecation
    this.http.get<{ message: string, result: any}>(`${environment.backendURL}/api/eventActivity/${id}`).subscribe((response) => {
      console.log(response);
      this.registeredEvents.next(response.result);
    });
  }

  getUpdatedRegisteredEvents(): any {
    return this.registeredEvents.asObservable();
  }

  addToEvent(data): void {
    // tslint:disable-next-line: deprecation
    this.http.post(`${environment.backendURL}/api/eventActivity`, data).subscribe((response) => {
      console.log(response);
    });
  }
}
