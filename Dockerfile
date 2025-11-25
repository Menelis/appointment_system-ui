FROM nginxinc/nginx-unprivileged:alpine3.22-perl

# Use roo user to copy dist folder and modify user access to specific folder
USER root

### copy nginx custom config
COPY appointment_ui_nginx.config /etc/nginx/conf.d/default.conf

#### Copy artifact build
##COPY dist/appointment-system-ui /app
COPY dist/appointment-system-ui/browser /app

# Setup unprivileged user 1001
RUN chown -R 1001 /app

# Use user 1001
USER 1001

EXPOSE 8080
