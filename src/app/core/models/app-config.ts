import { AuthConfig } from 'angular-oauth2-oidc';
import { ResourceServerConfig } from './resource-server-config';
import {InjectionToken} from '@angular/core';
import {DefaultUiSettings} from './default-ui-settings';

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('APP_CONFIG_TOKEN');

export interface AppConfig {
  production: boolean
  authServer: AuthConfig;
  resourceServer: ResourceServerConfig,
  defaultUiSettings: DefaultUiSettings
}
