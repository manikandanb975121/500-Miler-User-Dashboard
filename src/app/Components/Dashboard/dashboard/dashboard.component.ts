import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { AuthService } from '../../../Services/auth.service';
import { DashboardService } from '../../../Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  registeredEvents: any;
  count = 0;
  disableRight = false;
  disableLeft = true;
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // // tslint:disable-next-line: deprecation
    // this.route.queryParams.subscribe(params => {
    //     console.log(params); // { order: "popular" }
    //   }
    // );

    // this.dashboardService.getDashboardRegisteredEvents();
    // this.dashboardService.getUpdatedDashboardRegisteredEvents().subscribe((events) => {
    //   this.registeredEvents = events;
    // });
  }

  // logout(): void {
  //   this.authService.logout();
  // }


  increment(): void {
    // console.log(this.count);
    this.count = this.count + 1;
    if ((this.registeredEvents.length - 1 ) === this.count) {
      // this.count = this.count + 1;
      this.disableRight = true;
    }
    this.disableLeft = false;
    console.log(this.count);
  }

  decrement(): void {
    this.count = this.count - 1;
    if ((this.count - 1 ) <= 0) {
      // this.count = this.count + 1;
      this.disableLeft = true;
      this.disableRight = false;
    }
    console.log(this.count);
  }

  openView(id): void {
    this.router.navigate(['events', id]);
  }

}
