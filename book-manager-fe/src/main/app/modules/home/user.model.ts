import { IUser } from '../../data/interfaces/user.interface';
export class User implements IUser {
  constructor(public pecAddress?: string, public fiscalCodeVat?: string, public reCaptcha?: string) {
    this.pecAddress = pecAddress ? pecAddress : null;
    this.fiscalCodeVat = fiscalCodeVat ? fiscalCodeVat : null;
    this.reCaptcha = reCaptcha ? reCaptcha : null;
  }
}
