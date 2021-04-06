import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

// Services
import { NbSidebarService } from '@nebular/theme';

// Auth Services
import { AuthService } from './Services/auth.service';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'User Dashboard';
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  userIsAuthenticated2 = true;
  user: any;
  image = localStorage.getItem('profile_pic');

  enable = true;
  enable2 = false;
  itemss: NbMenuItem[] = [
    {
      title: 'DASHBOARD',
      group: true,
    },
    {
      title: 'Dashboard',
      icon: 'grid-outline',
      link: '/',
      home: true,
    },
    {
      title: 'Events',
      icon: 'paper-plane-outline',
      link: '/events',
    },
    {
      title: 'STRAVA',
      group: true,
    },
    {
      title: 'Strava Activity',
      icon: 'activity-outline',
      link: '/strava',
    },
    {
      title: 'USERS',
      group: true,
    },
    {
      title: 'Users',
      icon: 'person-outline',
      // children: [
      //   {
      //     title: 'Products',
      //     icon: 'plus-circle-outline',
      //     link: 'products',
      //   },
      //   {
      //     title: 'Combo',
      //     icon: 'plus-circle-outline',
      //     link: '/pages/layout/list',
      //   },
      // ],
    },
    // {
    //   title: 'Employees',
    //   icon: 'people-outline',
    //   children: [
    //     {
    //       title: 'Employees',
    //       icon: 'person-add-outline',
    //       link: '/pages/forms/inputs',
    //     },
    //   ],
    // },
    // {
    //   title: 'Coupon',
    //   icon: 'film-outline',
    //   link: '/pages/ui-features',
    //   children: [
    //     {
    //       title: 'Coupon',
    //       icon: 'plus-square-outline',
    //       link: '/pages/ui-features/grid',
    //     }
    //   ]
    // }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private route: ActivatedRoute,
    private authService: AuthService
  )
  { }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();

    console.log(this.userIsAuthenticated);
    if (!this.userIsAuthenticated) {

      // tslint:disable-next-line: deprecation
      // this.route.queryParams.subscribe(params => {
      //     console.log(params); // { order: "popular" }
      //     console.log(params.code);
      //     if (params.code) {
      //       const data = { code: params.code };
      //       this.authService.login(data);
      //     }
      //   }
      // );

    }
    console.log(this.userIsAuthenticated);
    // tslint:disable-next-line: deprecation
    this.authService.getAuthStateListener().subscribe(isAutheticated => {
      console.log(isAutheticated);
      console.log(this.userIsAuthenticated);
      this.userIsAuthenticated = isAutheticated;
      console.log(this.userIsAuthenticated);
      // this.userIsAuthenticated = false;
      // tslint:disable-next-line: deprecation
      this.authService.getUser().subscribe(user => {
        console.log(user);
        this.user = user;
      });
    });

    // tslint:disable-next-line: deprecation
    // this.route.queryParams.subscribe(params => {
    //     console.log(params); // { order: "popular" }
    //     console.log(params.code);
    //     if (params.code) {
    //       const data = { code: params.code };
    //       this.authService.login(data);
    //     }
    //   }
    // );
  }


  toggle(): void {
    this.sidebarService.toggle(false, 'menu-sidebar');
  }

  toggleCompact(): void {
    this.sidebarService.toggle(true, 'right');
  }

  ngOnDestroy(): void {
    // this.mediaSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  // tslint:disable-next-line: typedef
  isAuthenticated() {
    return this.userIsAuthenticated;
  }
}
