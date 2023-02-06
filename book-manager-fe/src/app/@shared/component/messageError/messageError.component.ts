import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import {Message, ErrorType } from './messageError.model';
import { MessageErrorService } from './messageError.service';

@Component({
    selector: 'messageError',
    templateUrl: 'messageError.component.html',
    styleUrls: [ './messageError.component.css' ]
})
export class MessageErrorComponent implements OnInit, OnDestroy {
    @Input() id: string;

    alerts: Message[] = [];
    subscription: Subscription;

    constructor(private readonly alertService: MessageErrorService) { }

    ngOnInit() {
        this.subscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    // clear alerts when an empty alert is received
                    this.alerts = [];
                    return;
                }

                // add alert to array
                this.alerts.push(alert);
            });
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.subscription.unsubscribe();
    }

    removeAlert(alert: Message) {
        // remove specified alert from array
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Message) {
        if (!alert) {
            // No CSS class
            return '';
        }

        // return css class based on alert type
        switch (alert.type) {
            case ErrorType.Error:
                return 'alert alert-danger';
            default:
                // No CSS class
                return '';
        }
    }
}
