# Appointment System UI

## Existing public Docker Image
 - There is an already existing public image you can use without building the new one if you not making code changes:
   - Image - ```docker.io/menelismthembu12/appointment-ui```
   - Tag - ``1.0.8``
 - The configuration can be mounted into the pod to be externalized.
   - It must be on the file path ``/assets/environments/environment.json``
 - Snippet of ConfigMap for external config
```yaml
# ConfigMap template
{{- if and .Values.configMap .Values.configMap.create -}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.configMap.name }}
data:
  {{ .Values.configMap.dataFileName | default "environment.json" }}: |-
    {{- $filename := print .Values.configMap.path .Values.configMap.fileName }}
    {{- .Files.Get $filename | nindent 4 }}
{{- end }}

#values.yaml
configMap:
  create: true
  path: environments/appointment-ui/
  name: appointment-ui

volumeMounts:
  - name: config-volume
    mountPath: /app/assets/environments

volumes:
  - name: config-volume
    configMap:
      name: appointment-ui

# values-{env}.yaml
configMap:
  fileName: environment-dev.json
```
- Config
```json
{
  "production": false, // This must be true in prod
  "authServer": {
    //Auth Server endpoints
    "issuer": "http://auth-server:9000",
    //Client ID registered on Auth Server
    "clientId": "{oidc client}",
    // Redirect Url after successfull signin
    "redirectUri": "http://ui:4200/callback", 
    // Url to redirect to after sign out
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
## Build Docker File(if not using existing public image provided on the above steps)
- On the project directory(``../appointment_system-ui``)
  - Run command ``ng build``
  - Using Docker
    - ``docker build -t appointment_system-ui:{tag version} .``
  - Using Containerd
    - ``nerdctl build -t appointment_system-ui:{tag version} .``

## Technology Stack
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

## Home Page Preview
![Home Page](https://github.com/Menelis/appointment_system-ui/blob/main/Appointment%20-%20UI%20-%20v2.gif)
