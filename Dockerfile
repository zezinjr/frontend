ARG image=dependencies
ARG environment=environment

FROM $image AS build-image

WORKDIR $APP_PATH

COPY . $APP_PATH

ENV BUILD_ENV=$environment

FROM build-image AS build-image-environment
RUN ng build --configuration=$BUILD_ENV


FROM nginx

COPY /config/nginx-local.conf/ /etc/nginx/conf.d/default.conf

COPY --from=build-image-environment /tmp/dist/tecommerce-web/browser /usr/share/nginx/html