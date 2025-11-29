FROM nginxinc/nginx-unprivileged:alpine3.22-perl

COPY appointment_ui_nginx.config /etc/nginx/config.d/default.config

# Copy the built Angular application from the 'browser' folder
COPY dist/appointment-system-ui/browser /usr/share/nginx/html

EXPOSE 8080
