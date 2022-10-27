import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from "../../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import {FbAuthResponse} from "../../shared/interfaces";
@Injectable({providedIn: 'root'})
export class AuthService {
  private authToken: string = ''
  errorMessage$: Subject<any> = new Subject<any>()

  constructor(private http: HttpClient) { }

  login(user: User): Observable<FbAuthResponse | null> {
    user.returnSecureToken = true
    return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.setToken(null)
  }

  handleError(error: HttpErrorResponse) {

    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.errorMessage$.next('Emailinvalid');
        break;
      case 'INVALID_PASSWORD':
        this.errorMessage$.next('Password invalid');
        break
      case 'EMAIL_NOT_FOUND':
        this.errorMessage$.next('Email not found');
        break
    }
    return throwError(error);
  }

  get token(): string | null {
    const tokenExpiresIn = localStorage.getItem('expiresIn')
    if(tokenExpiresIn !== null && new Date((tokenExpiresIn)) < new Date()) {
      this.logout()
      return null
    }
    return localStorage.getItem('tokenAuth');
  }

  private setToken(response: FbAuthResponse | null): void{
    if(response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('tokenAuth', response.idToken);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear()
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
