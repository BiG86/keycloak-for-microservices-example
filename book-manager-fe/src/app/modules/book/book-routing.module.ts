import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {marker} from '@biesbjerg/ngx-translate-extract-marker';

import {RoutingService} from "../@shared/services/routing.service";
import {BookComponent} from "./page/book.component";
import {AuthGuard} from "../@core/services";

const routes: Routes = [
  RoutingService.childRoutes([
    {path: '', redirectTo: '/book', pathMatch: 'full'},
    {path: 'book', component: BookComponent, data: {title: marker('BookManager')}, canActivate: [AuthGuard]},
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class BookRoutingModule {
}
