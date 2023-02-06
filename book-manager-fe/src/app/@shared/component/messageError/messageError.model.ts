export class Message {
    type: ErrorType;
    message: string;
    alertId: string;
    keepAfterRouteChange: boolean;

    constructor(init?:Partial<Message>) {
        Object.assign(this, init);
    }
}

export enum ErrorType {
    Error
}
