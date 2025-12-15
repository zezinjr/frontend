import {HttpErrorResponse, HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {inject, Injector} from "@angular/core";
import {AuthService} from "../../pages/auth/services/auth-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const injector = inject(Injector);
    const authService = injector.get(AuthService);

    const token: string = authService.accessToken;

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                "Accept-Language": 'pt-BR'
            }
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
            const toast: ToastrService = injector.get(ToastrService);
            toast.error(error.error['detail'], 'Aconteceu um erro');
            return throwError(() => error);
        })
    );
};
