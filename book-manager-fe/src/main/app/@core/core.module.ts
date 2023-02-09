/*
 * initializeTheApp : you can start the app from here.
 */
import {NgModule, Optional, SkipSelf} from '@angular/core';

@NgModule({})
// The CoreModule class protects against multiple loading of this module
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      // Exit with an error
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
