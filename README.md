# Appointment System UI

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.18.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

- Config
```json
{
  "production": false
  "authServer": {
    "issuer": "http://auth-server:9000",
    "clientId": "{oidc client}",
    "redirectUri": "http://ui:4200/callback",
    "postLogoutRedirectUri": "http://ui:4200/account/sign-out",
    "scope": "openid profile email",
    "strictDiscoveryDocumentValidation": false,
    "responseType": "code",
    "requireHttps": false,
    "disableAtHashCheck": false,
    "useSilentRefresh": false,
    "disablePKCE": false
  },
  "resourceServer": {
    "endPoint": "http://api-gateway:9001/api/v1"
  },
  "defaultUiSettings": {
    "pageSize": 10
  }
}
```
- Build docker file
  - On the project directory(``../appointment_system-ui``)
    - Run command ``ng build``
    - Using Docker
      - ``docker build -t appointment_system-ui:{tag version} .``
    - Using Containerd
      - ``nerdctl build -t appointment_system-ui:{tag version} .``
- Stack
  - [Angular](https://v19.angular.dev/overview) 19.2.0
    - Packages 
      - [Boostrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) 5.3.8
        - For responsive styling
      - [Angular OAuth2 OIDC](https://www.npmjs.com/package/angular-oauth2-oidc/v/20.0.2) 20.0.2
        - Library to access Auth Server
      - [JWT Decode](https://www.npmjs.com/package/jwt-decode) 4.0.0
        - Decode tokens to extract claims
      - [Bootstrap Icons](https://www.npmjs.com/package/bootstrap-icons) 1.13.1
        - Package for icons
      - [Sweet Alert 2](https://www.npmjs.com/package/sweetalert2) 11.26.3
        - Package for confirmation modals
      - [NG Bootstrap](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap) 18.0.0
        - Package for Angular widgets like
          - Pagination
          - Datepicker
          - [More](https://ng-bootstrap.github.io/#/components/accordion/overview)
