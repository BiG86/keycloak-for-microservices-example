/*
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
// The ApiPrefixInterceptor sends the required XSRF cookie with each request
export class ApiPrefixInterceptor implements HttpInterceptor {
  // cookieService: the cookie service
  constructor(private readonly cookieService: CookieService) {
  }

  /**
   * The main method to intercept the HTTP requests
   * @param request The http request to intercept
   * @param next The http handler
   * @returns The subsequent HttpEvent, eventually modified
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
    const token = this.cookieService.get('XSRF-TOKEN') as string;
    if (token !== '' && !request.headers.has(headerName)) {
      request = request.clone({headers: request.headers.set(headerName, token)});
    }
    return next.handle(request);
  }

}
