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

  public getData<T>(route: string) {
    return this._http.get<T>(this.createCompleteRoute(route));
  }
  public create<T> (route: string, body: any)  {
    return this._http.post<T>(this.createCompleteRoute(route), body);
  }

  public update<T>(route: string, body: any)  {
    return this._http.put<T>(this.createCompleteRoute(route), body);
  }

  public delete<T>  (route: string)  {
    return this._http.delete<T>(this.createCompleteRoute(route));
  }
  private createCompleteRoute = (route: string) => {
    return `${this.resourceServerEndpoint}/${route}`;
  }
}
