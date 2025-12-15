import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpInterceptorFn, provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideToastr, ToastrService} from "ngx-toastr";

import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {authInterceptor} from "./app/core/interceptors/auth-interceptor";
import {errorInterceptor} from "./app/core/interceptors/error-interceptor";
import {AppVariables} from "./app/pages/auth/models/app-variables";


const interceptors: HttpInterceptorFn[] = [
    authInterceptor,
    errorInterceptor,
]


export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(withInterceptors(interceptors)),
        provideToastr({timeOut: 5000, positionClass: 'toast-top-right', preventDuplicates: true}),
        provideAnimationsAsync(),
        ToastrService,
        AppVariables
    ]
};
