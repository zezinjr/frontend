import {CanActivateFn} from '@angular/router';
import {inject, Injector} from "@angular/core";
import {AuthService} from "../services/auth-service";


export const authGuard: CanActivateFn = (route, state) => {
    const injector: Injector = inject(Injector);
    const authService: AuthService = injector.get(AuthService);

    if (authService.isLogged) {
        return true;
    }

    authService.logout(false, true, {queryParams: {u: state ? state.url : "/"}})
    return false;
};
