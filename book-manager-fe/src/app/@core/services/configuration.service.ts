import {HttpClient,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigurationLoader} from '../configuration/configuration-loader.service';
import {BaseAbstract} from './Base.abstract';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends BaseAbstract {
  private readonly baseurl: string;
  public initialized = false;

  constructor(private readonly httpClient: HttpClient, private readonly configurationLoader: ConfigurationLoader) {
    super();
  }


}
