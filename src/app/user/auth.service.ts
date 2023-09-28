import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUser } from './iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/';
  private apiLoginUrl = 'api/api-token-auth/';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();  

  currentUser?: IUser | undefined;

  constructor(private http: HttpClient) { }

  login(user: {username: string, password: string}): Observable<{username:string, token: string}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<{token: string}>(this.apiUrl + this.apiLoginUrl, user, { headers })
      .pipe(
        map(response => {
          if (response.token) {
            const userObject = {
              username: user.username,
              token: response.token
            };

            // If a token is present in the response, it's a successful login
            // localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(userObject));
            
            // Update the authentication state.
            this.isAuthenticatedSubject.next(true);

            return userObject;
          } 
          else {
            // If no token is present, handle it as an invalid login
            throw new Error('Invalid login');
          }
        }),
        catchError(this.handleError)
      );      
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  logout(): void {
    // Remove the token and update the authentication state.
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  // Check if the user is authenticated based on the token.
  isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return !!token; // Returns true if token exists, otherwise false.
  }  

  getToken(): string | undefined {
    const storedUser = localStorage.getItem('user');

    if(storedUser !== null) {
      const userObject = JSON.parse(storedUser);
      return userObject ? userObject.token : undefined;
    }
    else {
      return undefined;
    }
  }

  getUsername(): string | undefined {
    const storedUser = localStorage.getItem('user');

    if(storedUser !== null) {
      const userObject = JSON.parse(storedUser);
      return userObject ? userObject.username : undefined;
    }
    else {
      return undefined;
    }
  }

}
