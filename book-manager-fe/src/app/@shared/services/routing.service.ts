import {Routes, Route} from '@angular/router';
import {ContentLayoutComponent} from '../../layout/content-layout/content-layout.component';

/**
 * Provides helper methods to create routes.
 */
export class RoutingService {
  // Child routes are routes that are derived from the base one
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ContentLayoutComponent,
      children: routes,
    };
  }
}
