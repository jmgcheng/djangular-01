import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUser } from './iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://chengs1.net/';
  /* 
    http://localhost:8000/
      - this was an instance of customUserBlogProdInvApi01
        - https://github.com/jmgcheng/customUserBlogProdInvApi01
        - Python - Django - Basic User Registration/Authentication, Blog, Product, Inventory, and API
  */
  private apiLoginUrl = 'api/api-token-auth/';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  /* 
    isAuthenticatedSubject, isAuthenticated$
      - just used in updating authentication state
      - this is the first the I used this not together with getting data in database
      - its use here just like a simple variable flag
      - this might be set below but was not really used
      - part provided by chatgpt
    isAuthenticated$
      - supposedly to be used in a template like isAuthenticated$ | async
  */


  currentUser?: IUser | undefined;

  constructor(private http: HttpClient) { }

  login(user: {username: string, password: string}): Observable<{username:string, token: string}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<{token: string}>(this.apiUrl + this.apiLoginUrl, user, { headers })
      .pipe(
        map(response => {
          if (response.token) { // If a token is present in the response, it's a successful login
            const userObject = {
              username: user.username,
              token: response.token
            };

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
