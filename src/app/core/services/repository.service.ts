import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG_TOKEN, AppConfig} from '../models/app-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  resourceServerEndpoint!: string;

  constructor(@Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              private _http: HttpClient) {
    this.resourceServerEndpoint = appConfig.resourceServer.endPoint;
  }

  public getData = (route: string) => {
    return this._http.get(this.createCompleteRoute(route));
  }
  public create = (route: string, body: any) => {
    return this._http.post(this.createCompleteRoute(route), body);
  }

  public update = (route: string, body: any) => {
    return this._http.put(this.createCompleteRoute(route), body);
  }

  public delete = (route: string) => {
    return this._http.delete(this.createCompleteRoute(route));
  }
  private createCompleteRoute = (route: string) => {
    return `${this.resourceServerEndpoint}/${route}`;
  }
}
