import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler  , HttpEvent} from '@angular/common/http';
import { AuthService } from './auth.services';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError  } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService , private router: Router , private route: ActivatedRoute ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + authToken,
            }
        });
        return next.handle(req).pipe(
            catchError(
                (err, caught) => {
                  if (err.status === 401) {
                    this.handleAuthError();
                    return of(err);
                  }
                  throw err;
                }
              )
        );
    }

    private handleAuthError() {
        this.authService.doLogout();
        this.router.navigate(['']);
      }
}
