import { Component, OnInit } from '@angular/core';
import { NbFlipCardComponent } from '@nebular/theme/components/card/flip-card/flip-card.component';
import { Router } from '@angular/router';

// Services
import { StravaService } from '../../../Services/strava.service';

@Component({
  selector: 'app-strava-activity-list',
  templateUrl: './strava-activity-list.component.html',
  styleUrls: ['./strava-activity-list.component.scss']
})
export class StravaActivityListComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;
  activities: any;
  constructor(
    private stravaService: StravaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stravaService.getActivity();
    this.stravaService.getUpdatedActivity().subscribe((response) => {
      this.activities = response;
    });
  }

  toggleCard($event: any, $cardComponent: NbFlipCardComponent): void {
    $cardComponent.toggle();
  }

  kiloMeter(n): any {
    // console.log(n);
    return parseFloat((n / 1000).toString()).toFixed(2);
  }

  openEvent(id): any {
    console.log(id);
    this.router.navigate(['strava', id]);
  }
}
