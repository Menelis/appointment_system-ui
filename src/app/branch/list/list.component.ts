import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG_TOKEN, AppConfig} from '../../core/models/app-config';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  resourceServerUrl!: string;
  constructor(private _http: HttpClient,
              @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig) {
    this.resourceServerUrl = appConfig.resourceServer.endPoint;
  }
  ngOnInit(): void {
    this._http.get(`${this.resourceServerUrl}branch`).subscribe({
      next:(response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
