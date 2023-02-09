import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {headerRoute} from "./layout/header/header.route";

const routes: Routes = [
  // ...LAYOUT_ROUTES,
  ...headerRoute,
  {
    path: 'book',
    canActivate: [],
    loadChildren: () => import('./modules/book/book.module').then((m) => m.BookModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
