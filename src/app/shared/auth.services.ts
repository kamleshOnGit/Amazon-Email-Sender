import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint = 'http://sp.vancotech.com/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = '';

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('rolename', res.data.roleName);
        this.currentUser = res.data.roleName;
        if (res.data.roleName === 'admin') {
          this.router.navigate(['admin/']);
        } else if (res.data.roleName === 'superAdmin') {
          this.router.navigate(['superadmin/']);
        } else if (res.data.roleName === 'employee') {
          this.router.navigate(['employee/']);
        } else if (res.data.roleName === 'support') {
          this.router.navigate(['support/']);
        }


        // this.getUserProfile(res.id).subscribe((res: any) => {
        //   this.currentUser = res;
        //   this.router.navigate(['admin/' + res.msg.id]);
        // });
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRole() {
    return localStorage.getItem('rolename');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
      
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    const api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
