import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Toaster
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

// Services
import { StravaService } from '../../../Services/strava.service';
import { EventsService } from '../../../Services/events.service';

// Reactive Form
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Mat Dialog
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-strava-activity-details',
  templateUrl: './strava-activity-details.component.html',
  styleUrls: ['./strava-activity-details.component.scss']
})
export class StravaActivityDetailsComponent implements OnInit {

  activity: any;
  events: any;
  selectedEvent: any;
  enable = false;
  activityAndDates: any;
  id: string;
  addEventForm = new FormGroup({
    eventId: new FormControl('', Validators.required),
    activityId: new FormControl('', Validators.required),
    activityName: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    km: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required)
  });

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  constructor(
    private route: ActivatedRoute,
    private stravaService: StravaService,
    private dialog: MatDialog,
    private eventServices: EventsService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log(id);
    this.stravaService.getStravaActivityById(id);
    this.stravaService.getUpdatedActivityById().subscribe((response) => {
      console.log(response);
      this.activity = response;
      // this.eventServices.getRegisteredEvents();
    });
  }

  register(id): void {
    console.log(id);
    this.eventServices.getRegisteredEvents(this.id);
    this.eventServices.getUpdatedRegisteredEvents().subscribe((response) => {
      console.log(response);
      this.events = response;
    });
    this.dialog.open(this.secondDialog, {
      width: '600px',
      height: '550px'
    });
  }

  select(e): void {
    console.log(e);
    this.selectedEvent = this.events.find(x => x.eventId._id === e.value);
    console.log(this.selectedEvent);
    this.activityAndDates = this.selectedEvent.activity;
    this.addEventForm.patchValue({
      eventId: e.value,
      activityId: this.activity.id,
      activityName: this.activity.name,
      km: this.activity.distance,
      id: this.selectedEvent._id
    });
    this.enable = true;
  }

  addEvent(): void {
    const activity = this.activityAndDates.filter(x => new Date(x.date).getTime() === this.addEventForm.value.date.getTime());
    if (activity.length === 0) {
      this.eventServices.addToEvent(this.addEventForm.value);
      // console.log('passed');
    } else {
      this.showToast('warning', this.addEventForm.value.date);
    }
    console.log(this.addEventForm.value);
    // this.eventServices.addToEvent(this.addEventForm.value);
  }

  showToast(status: NbComponentStatus, date: Date): void {
    this.toastrService.show(status, `${date.toDateString()} has been selected already`, { status });
  }
}
