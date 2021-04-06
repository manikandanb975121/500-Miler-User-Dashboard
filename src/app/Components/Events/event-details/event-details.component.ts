import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


// Services
import { EventsService } from '../../../Services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  events: any;

  constructor(
    private route: ActivatedRoute,
    private eventServices: EventsService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.eventServices.getEventsById(id);
    this.eventServices.getUpdatedEventsById().subscribe((response) => {
      console.log(response);
      this.events = response;
    });
  }

  register(id): void{
    console.log(id);
    this.eventServices.registerEvent({eventId: id});
  }
}
