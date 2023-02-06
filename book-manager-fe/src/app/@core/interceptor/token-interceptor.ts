import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {from, Observable, interval} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

@Injectable()
// The TokenInterceptor class provides the authorization bearer header from the auth service
export class TokenInterceptor implements HttpInterceptor {
  // auth: The auth service
  constructor(private readonly auth: AuthService) {
  }

  /**
   * The main method to intercept HTTP requests
   * @param req The request to intercept
   * @param next The HTTP handler
   * @returns An Observable incapsulating the further HttpEvent
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenPromise: Promise<string> = this.auth.getToken();
    const tokenObservable: Observable<string> = from(tokenPromise);

    // Get the token and set the headers:
    // - Content-Type: the content type
    // - Accept: the content type to accept
    // - X-Frame-Options: set to same origin
    // - X-Content-Security-Policy: the content security policy
    // - Strict-Transport-Security: the strict-transport security policy
    // - Authorization: the auth header with the token
    return tokenObservable.pipe(
      map(authToken => {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'X-Frame-Options': 'SameOrigin',
            'X-Content-Security-Policy': 'allow *; options inline-script eval-script; frame-ancestors \'self\';',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Authorization': 'Bearer ' + authToken
          }
        });
      }),
      // Concatenate the result and continue
      concatMap(request => {
        // Handle the next HttpEvent
        return next.handle(req);
      })
    );
  }
}
