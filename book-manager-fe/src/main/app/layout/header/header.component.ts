import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from "../../@core/services";
import {roles} from "../../data/constants/constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages: any[];
  version: string;
  showAssistenza = false;
  showTicket = false;
  showIT = true;
  showEN = false;
  navbarOpenLang = false;
  navbarOpenMenu = false;
  navbarOpenDown = false;
  clientRoles: any;
  isNavbarCollapsed: boolean;
  swaggerEnabled: boolean;

  constructor(
    private readonly router: Router,
    public auth: AuthService,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.clientRoles = roles;
    this.changePosition(this.translate.getDefaultLang());
  }

  logout() {
    this.auth.logout();
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  toggleNavbarMenu() {
    this.navbarOpenMenu = !this.navbarOpenMenu;
  }

  toggleNavbarLang() {
    this.navbarOpenLang = !this.navbarOpenLang;
  }

  toggleNavbarDown() {
    this.navbarOpenDown = !this.navbarOpenDown;
  }

  isAuthenticated() {
    return AuthService.auth.loggedIn;
  }

  refresh() {

  }

  isInRoles(role: string) {
    return true;
  }

  changePosition(lang: string) {
    if (lang === 'it') {
      this.showIT = true;
      this.showEN = false;
    } else {
      if (lang === 'en') {
        this.showIT = false;
        this.showEN = true;
      } else {
        // default lang 'it'
        this.showIT = true;
        this.showEN = false;
      }
    }
    this.translate.use(lang);
  }
}
