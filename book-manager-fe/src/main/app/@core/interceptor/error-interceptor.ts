/*
 * Adds a default error handler to all requests.
 */
import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Logger} from '../services/logger.service';
import {ResponseError} from '../interfaces/ResponseError';
import {TranslateService} from '@ngx-translate/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AlertService} from '../../@shared/component/alert';
import {NotificationService} from '../services/notification.service';

const log = new Logger('ErrorHandlerInterceptor');

@Injectable({
  providedIn: 'root',
})
// Class to gracefyully handle HTTP errors
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly translateService: TranslateService,
              public notificationService: NotificationService,
              public alertService: AlertService,
              private readonly ngxService: NgxUiLoaderService) {
  }

  /**
   * The main interceptor method, used to eventually modify the request
   * @param request The HTTP request
   * @param next The HTTP handler
   * @returns The next HttpEvent or a gracefully-handled error
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ResponseError>> {
    return next.handle(request).pipe(
      tap(
        (response: HttpResponse<any>) => {
          if (!!response.status) {
            // Decode the response
            this.decodeResponse(response);
          }
        }
      ),
      // Catch errors
      catchError((error: HttpErrorResponse) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<ResponseError>> {
    const result = new ResponseError();

    // 5xx => Internal server error
    if (response.status.toString().startsWith('5')) {
      if (response.error.message) {
        this.alertService.error(this.translateService.instant(response.error.message[0]));
      } else {
        this.alertService.error(response.error.error);
      }
    } else {
      // Translate
      result.message = this.translateService.instant(response.error.message[0]);
    }
    // Always
    result.success = false;
    result.payload = response;
    result.status = response.status;
    // Stop the Ngx service
    this.ngxService.stop();
    // Throw the exception
    throw result;
  }

  /**
   * Method to decode and validate the HTTP exception.
   * Throws an exception if one of the errors is found.
   *
   * @param response The response
   */
  protected decodeResponse(response: HttpResponse<any>): void {
    if(!!response && response.body &&(
      response.body.resultCode < 0
    )) {
      // Show an error via notification
      this.notificationService.showError(`${response.body.resultMessage}`, this.translateService.instant('errors.errorData') );
    }
  }
}
