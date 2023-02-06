import {Injectable} from '@angular/core';
import {ConfigurationLoader} from '../configuration/configuration-loader.service';

declare const Keycloak: any;

@Injectable({providedIn: 'root'})
export class AuthService {
  static auth: any = {};
  constructor (private readonly configurationLoader: ConfigurationLoader) {}

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const keycloakAuth = Keycloak('assets/keycloak/keycloak.json');
      keycloakAuth.init({onLoad: 'login-required', checkLoginIframe: false, pkceMethod: 'S256'}).success(() => {
        AuthService.auth.loggedIn = true;
        AuthService.auth.keycloak = keycloakAuth;
        AuthService.auth.logoutUrl = `${keycloakAuth.authServerUrl}/realms/${keycloakAuth.realm}/protocol/openid-connect/logout?redirect_uri=${document.baseURI}`;
        this.configurationLoader.loadConfiguration().then(() => {
          resolve(true);
        });


      }).error((error: any) => {
        reject();
      });
    });
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (AuthService.auth.keycloak.token) {
        const timeout: number = 60
        AuthService.auth.keycloak.updateToken(timeout).success((refreshed: any) => {
          resolve(<string>AuthService.auth.keycloak.token);
        }).error(() => {
          reject('Failed to refresh token');
        });
      } else {
        reject('Not logged in');
      }
    });
  }

  isAuthenticated() {
    return AuthService.auth.keycloak.authenticated;
  }

  getParsedToken() {
    return AuthService.auth.keycloak.tokenParsed;
  }

  getAccessToken() {
    return AuthService.auth.keycloak.getToken;
  }


  getRoles() {
    if(!AuthService.auth.keycloak.token){
      return null;
    }
    const encoded = AuthService.auth.keycloak.token.split('.')[1];
    const userDetails = JSON.parse(this.urlBase64Decode(encoded));
    return (
      userDetails.resource_access &&
      userDetails.resource_access[AuthService.auth.keycloak.clientId].roles
    );
  }

  isInRoles(role: any) {
    if (AuthService.auth.keycloak.token) {
      const encoded = AuthService.auth.keycloak.token.split('.')[1];
      const userInfo = JSON.parse(this.urlBase64Decode(encoded));
      return userInfo.realm_access.roles.indexOf(role) > -1;
    } else {
      return false;
    }
  }

  logout() {
    AuthService.auth.loggedIn = false;
    AuthService.auth.authz = null;
    AuthService.auth.keycloak = null;
    window.location.href = AuthService.auth.logoutUrl;
  }

  urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    const base64Unit: number = 4;
    const missingTrailingDoubleEqualSign: number = 2;
    const missingTrailingSingleEqualSign: number = 3;
    const isOk: number = 0;
    switch (output.length % base64Unit) {
      case isOk:
        break;
      case missingTrailingDoubleEqualSign:
        output += '==';
        break;
      case missingTrailingSingleEqualSign:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return window.atob(output);
  }
}
