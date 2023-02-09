import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AlertService} from "../../../@shared/component/alert";
import {AuthService} from "../../../@core/services";
import {ModalService} from "../../../_modal";
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accessControl: boolean;
  items: any;
  public clientRoles: any;
  showNoRoles = false;
  options: any;
  data: any;

  constructor(
    private readonly auth: AuthService,
    public translate: TranslateService,
    private readonly modalService: ModalService,
    private readonly ngxService: NgxUiLoaderService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.router.navigate(['book']);
  }

}
