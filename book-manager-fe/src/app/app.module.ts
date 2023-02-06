import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app.routing.module';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION,
  SPINNER
} from 'ngx-ui-loader';
import {DatePipe} from '@angular/common';
import {ConfirmationDialogComponent, ConfirmationDialogService} from "./@shared/component/confirmation-dialog";
import {AlertModule} from "./@shared/component/alert";
import {AuthService, CommonService, StateStorageService} from "./@core/services";
import {TokenInterceptor} from "./@core/interceptor/token-interceptor";
import {ErrorInterceptor} from "./@core/interceptor/error-interceptor";
import {SharedModule} from "./@shared/shared.module";
import {LayoutModule} from "./layout/layout.module";
import {HomeModule} from "./modules/home/home.module";
import {HeaderComponent} from "./layout/header/header.component";
import {BookModule} from "./modules/book/book.module";
import {CoreModule} from "./@core/core.module";
import {CookieService} from 'ngx-cookie-service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NotificationService} from "./@core/services/notification.service";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'orange',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.threeBounce, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
        TranslateModule.forRoot(),
        CoreModule,
        LayoutModule,
        SharedModule,
        HomeModule,
        ApplicationModule,
        ChannelsModule,
        OperationTypeModule,
        AlgorithmModule,
        ServiceTypeModule,
        DomainModule,
        TemplateModule,
        ImportModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule,
        NgxUiLoaderHttpModule.forRoot({showForeground: true}),
        AppRoutingModule,
        HttpClientModule,
        AlertModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpBackend]
          }
        }),
        HttpClientXsrfModule.withOptions({
          cookieName: 'XSRF-TOKEN',
          headerName: 'X-XSRF-TOKEN',
        })
  ],
  exports: [],
  providers: [
     DatePipe,
     AuthService,
     StateStorageService,
     ConfirmationDialogService,
     CommonService,
     CookieService,
     NotificationService,
     {
       provide: APP_INITIALIZER,
       useFactory: kcFactory,
       deps: [AuthService],
       multi: true
     },
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function kcFactory(auth: AuthService) {
  return () => auth.init();
}

export function createTranslateLoader(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
