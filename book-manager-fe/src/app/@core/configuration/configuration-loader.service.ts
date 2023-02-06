import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from './configuration.model';
import {ConfigurationService} from '../services/configuration.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// The class is used to configure the app.
// It uses a configuration config.json file
export class ConfigurationLoader {
  private configuration!: Configuration;

  // http: the Angular-provided http client
  // configurationService: the service used for configuration
  constructor(private readonly http: HttpClient, private readonly configurationService: ConfigurationService) {
  }

  /**
   * Configuration loading
   * @returns A Promise resolving to configure the app
   */
  public loadConfiguration() {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.get('./assets/configuration/config.json'))
        .then((configuration: Configuration) => {
          this.configuration = configuration;
          resolve(true);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  /**
   * Getter for the configuration
   * @returns A Configuration object
   */
  getConfiguration(): Configuration {
    return this.configuration;
  }
}
