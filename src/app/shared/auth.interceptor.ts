import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../admin/services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export  class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService, private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthenticated() && this.authService.token) {
      req = req.clone({
        setParams: {
          auth: this.authService.token,
        },
      })
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          this.authService.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailed: true
            }
          })
        }
        return throwError(err)
      })
    )
  }

}
