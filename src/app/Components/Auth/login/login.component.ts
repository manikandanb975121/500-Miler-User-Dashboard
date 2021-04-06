import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  login(): void {
    window.location.href = 'https://www.strava.com/oauth/authorize?client_id=52278&redirect_uri=http://localhost:3000/auth&response_type=code&scope=activity:read_all';
  }
}
