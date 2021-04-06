import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { AuthService } from '../../../Services/auth.service';
import { DashboardService } from '../../../Services/dashboard.service';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.scss']
})
export class DashboardEventsComponent implements OnInit {

  registeredEvents: any;
  leaderBoard: any;
  activity = [];
  participants: any;
  open = false;
  user: any;
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

    this.dashboardService.getDashboardRegisteredEvents();
    this.dashboardService.getUpdatedDashboardRegisteredEvents().subscribe((events) => {
      console.log(events);
      this.registeredEvents = events;
    });
  }


  openLeaderBoard(id): void {
    console.log(id);
    this.leaderBoard = this.registeredEvents.find(x => x._id === id);
    this.open = true;
    this.participants = this.leaderBoard.event_participants;
    console.log(this.leaderBoard);
  }

  openActivity(activity): void {
    console.log(activity);
    this.activity = activity;
  }

  onSerachChange(searchUser): void {
    const searchUsers = searchUser.toLowerCase();
    console.log(searchUsers);
    const user = this.participants.find(x => {
      console.log(x.user.first_name);
      console.log(x.user.first_name.toLowerCase().includes(searchUsers));
      return x.user.first_name.toLowerCase().includes(searchUsers);
    });
    console.log(user);
    this.user = user;
    this.activity = user.activity.activity;
  }

  openEvents(id): void {
    this.router.navigate(['events', id]);
  }
  // logout(): void {
  //   this.authService.logout();
  // }


  // openView(id): void {
  //   this.router.navigate(['events', id]);
  // }


}
