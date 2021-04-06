import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// FormControll
import { FormControl } from '@angular/forms';

// Services
import { EventsService } from '../../../Services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events: any;
  filter = false;
  filter2 = false;
  text = 'Register';
  status = 'primary';
  value = 'Upcoming Events';
  toggleFormControl = new FormControl(true);
  constructor(
    private eventServices: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventServices.getEvents();
    this.eventServices.getUpdatedEvents().subscribe((events) => {
      console.log(events);
      this.events = events;
    });
  }

  openView(id): void {
    console.log(id);
    this.router.navigate(['events', id]);
  }

  toggle(e): void {
    this.filter = !e;
    console.log(this.filter);
    if (this.filter) {
      this.text = 'View';
      this.status = 'success';
      this.value = 'OnGoing Events';
    } else {
      this.text = 'Register';
      this.status = 'primary';
      this.value = 'UpComing Events';
    }

  }

  // toggle2(e): void {
  //   this.filter2 = e;
  // }
}
