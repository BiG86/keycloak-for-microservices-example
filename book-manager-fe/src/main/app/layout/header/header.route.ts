import {Routes} from '@angular/router';

import {HeaderComponent} from './header.component';

export const headerRoute: Routes = [
  {
    path: '',
    component: HeaderComponent,
    outlet: 'header'
  }
];
