import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStateListener = new Subject<boolean>();
  private userId: string;
  private role: string;
  private user = new Subject<any>();
  private currentUser = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken(): string {
    console.log(this.token);
    return this.token;
  }

  // tslint:disable-next-line: typedef
  getAuthStateListener() {
    return this.authStateListener.asObservable();
  }


  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  // tslint:disable-next-line: typedef
  getUserId() {
    return this.userId;
  }

  // tslint:disable-next-line: typedef
  getUser() {
    return this.user.asObservable();
  }


  login(data): void {
    // tslint:disable-next-line: deprecation
    this.http.post<{ message: string, token: string, expiresIn: number, userId: string, role: string, image: string}>
    // tslint:disable-next-line: deprecation
    (`${environment.backendURL}/api/users`, data).subscribe((response) => {
      console.log(response);
      const token = response.token;
      this.token = token;
      localStorage.setItem('sample', this.token);
      if (token) {
        console.log('entered');
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        console.log(this.isAuthenticated);
        this.userId = response.userId;
        this.role = response.role;
        this.authStateListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000 );
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId, this.role, response.image);
        // this.getUserProfile();
        // this.openSnackBar('Login Successfull');
        this.router.navigate(['/']);
      }
    });
  }

    // tslint:disable-next-line: typedef
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      console.log(this.isAuthenticated);
      this.userId = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStateListener.next(true);
      // this.getUserProfile();
    }
  }


  // tslint:disable-next-line: typedef
  logout() {
    // tslint:disable-next-line: deprecation
    // this.http.post(`${environment.backendURL}/api/users/logout`, {date: new Date()}).subscribe(response => {
    //   console.log(response);
      this.token = null;
      this.isAuthenticated = false;
      this.authStateListener.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.userId = null;
      this.user.next(null);
      this.router.navigate(['/login']);
    // });
    // this.token = null;
    // this.isAuthenticated = false;
    // this.authStateListener.next(false);
    // clearTimeout(this.tokenTimer);
    // this.clearAuthData();
    // this.userId = null;
    // this.user.next(null);
    // this.router.navigate(['/login']);
  }

  // tslint:disable-next-line: typedef
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // tslint:disable-next-line: typedef
  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string, image: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('profile_pic', image);
  }

  // tslint:disable-next-line: typedef
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('profile_pic');
  }

  // tslint:disable-next-line: typedef
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line: object-literal-shorthand
      user: user
    };
  }

}
