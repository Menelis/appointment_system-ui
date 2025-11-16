import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import {enableProdMode} from '@angular/core';
import {APP_CONFIG_TOKEN} from './app/core/models/app-config';

fetch('/assets/environments/environment.json')
  .then(res => res.json())
  .then(response => {
    if(response.production) {
      enableProdMode();
    }
    platformBrowser([
      {
        provide: APP_CONFIG_TOKEN,
        useValue: response
      }
    ])
      .bootstrapModule(AppModule, {
        ngZoneEventCoalescing: true
      }).catch(error => console.error(error));
  });
