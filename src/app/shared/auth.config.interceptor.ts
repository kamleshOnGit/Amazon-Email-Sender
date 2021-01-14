import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.services';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,) { }

  popupmsg = { message: '' };
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      }
    });
    return next.handle(req).pipe(retry(0),
      catchError(
        (err, caught) => {

          if (err.status === 401 || err.status === 403) {
            this.handleAuthError(err);
            return of(err);
          }
          throw err;
        }
      )
    );
  }

  public openDialogSmall(action, obj) {

    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event === 'product not found') {
        // this.addRowData(result.data);
      } else if (result && result.event === 'Updatekey') {
        // this.updateRowData(result.data);
      }
    });
  }
  private handleAuthError(err: any) {
    this.popupmsg.message = err.error.message
    this.openDialogSmall('Loginback', this.popupmsg);
    this.authService.doLogout();
    this.router.navigate(['']);
    // window.location.reload();
  }
}
