import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Message, ErrorType } from './messageError.model';

@Injectable({ providedIn: 'root' })
export class MessageErrorService {
    private readonly subject = new Subject<Message>();
    private keepAfterRouteChange = false;

    constructor(private readonly router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    // enable subscribing to alerts observable
    onAlert(alertId?: string): Observable<Message> {
        return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
    }

    error(message: string, alertId?: string) {
        this.alert(new Message({ message, type: ErrorType.Error, alertId }));
    }
    // main alert method
    alert(alert: Message) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
    }

    // clear alerts
    clear(alertId?: string) {
        this.subject.next(new Message({ alertId }));
    }
}
