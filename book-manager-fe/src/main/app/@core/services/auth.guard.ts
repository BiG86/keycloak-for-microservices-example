// The AuthGuard class

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
// The AuthGuard class guards each frontend route to determine if something is visible or not
export class AuthGuard implements CanActivate {
  constructor(
    // The router
    private readonly router: Router,
    // The auth service
    private readonly authService: AuthService,
    // The translate service
    public translate: TranslateService
  ) {
  }

  /**
   * Determines if the user can see a certain frontend route or not
   * @param route The route to be activated
   * @param state The router state
   * @returns True if the user can access the route or false otherwise
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Determine if the user is authenticated
    const authenticated = this.authService.isAuthenticated();
    if (!authenticated) {
      // Cannot visit
      return false;
    }

    // Determine user roles
    const roles = this.authService.getRoles();
    // Are there required roles?
    const requiredRoles = route.data.roles;
    if (!requiredRoles || requiredRoles.length === 0) {
      // No required roles => access
      return true;
    } else {
      // Required roles are present but none was granted to the user => cannot visit
      if (!roles || roles.length === 0) {
        this.router.navigate(['/forbidden']);
        return false;
      }
      // User has roles, check if the required ones are among these
      let granted = false;
      for (const requiredRole of requiredRoles) {
        if (roles.indexOf(requiredRole) > -1) {
          granted = true;
          break;
        }
      }
      // Forbidden
      if (!granted) {
        this.router.navigate(['/forbidden']);
      }
      return granted;
    }
  }
}
