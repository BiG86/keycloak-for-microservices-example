import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseAbstract {
  // Error handling
  errorHandler(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Simple alert
    return throwError(errorMessage);
  }
  // Error handling
  errorMessage(error: string) {
    const errorMessage = `Error: ${error}`;

    // Simple alert
    return throwError(errorMessage);
  }
}
