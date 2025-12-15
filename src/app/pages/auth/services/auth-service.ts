import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpUserEvent} from "@angular/common/http";
import {User} from "../interfaces/user";
import {catchError, from, Observable, shareReplay, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {NavigationExtras, Router} from "@angular/router";
import {MenuResponse} from "../interfaces/menu-response";
import {AuthPayload} from "../interfaces/auth-payload";
import {AppVariables} from "../models/app-variables";
import {jwtDecode} from "jwt-decode";
import {AccountModule} from "../interfaces/account-module";

export enum TokenType {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http: HttpClient = inject(HttpClient);
    private router: Router = inject(Router);
    private url = environment.apiUrl;
    private storage: Storage = localStorage;
    private variables: AppVariables = inject(AppVariables);

    constructor() {
    }

    get user(): User {
        if (!this.variables.user) {
            const token: string = this.accessToken;
            const payload: AuthPayload = jwtDecode<AuthPayload>(token);
            const user: User = (payload.user as Record<string, any>) as User;
            user.url = this.url.concat(user.url);
            this.variables.user = user;
        }
        return this.variables.user;
    }

    public login(user: User) {
        return this.http.post(this.url + '/account/token/', user).pipe(
            tap((response: any) => {
                this.accessToken = response.token['access'];
            }),
            shareReplay(),
        );
    }

    set accessToken(token: string) {
        this.storage.setItem('access_token', token);
    }

    get accessToken(): string {
        return this.storage.getItem('access_token');
    }

    private clearStorage() {
        this.storage.clear();
    }

    public logout(reload?: boolean, redirect?: boolean, extras?: NavigationExtras): void {
        this.clearStorage();
        if (reload) {
            location.reload();
        }
        if (redirect) {
            this.router.navigate(["auth/login"], extras).then();
        }
    }

    public loadMenus(modules: unknown[]): Observable<MenuResponse> {
        const params = new HttpParams({
            fromObject: {
                "user": this.user.id.toString(),
                "modules": String(modules)
            }
        });

        return this.http.get(`${this.url}/account/module_menu/find_menu/`, {params: params})
            .pipe(
                tap((response: any) => response as HttpUserEvent<MenuResponse>),
                catchError(() => from([]))
            );
    }

    public loadInitModule(): Observable<AccountModule> {
        const params = new HttpParams({
            fromObject: {"permission_name": "account.load_module"}
        });

        const options = {"params": params};
        return this.http.get(`${this.url}/account/module_menu/initial_module/`, options)
            .pipe(tap((response: any) => response as HttpUserEvent<AccountModule>),
                catchError(() => from([]))
            );
    }

    get isLogged(): boolean {
        const access: string = this.storage.getItem(TokenType.ACCESS_TOKEN) || "";
        return access !== "";
    }


    public loadModulesAllowed(): Observable<AccountModule[]> {
        const params = new HttpParams({
            fromObject: {
                "user": this.user.id.toString(),
                "granted": "true",
                "is_active": "true"
            }
        });
        const options = {"params": params};
        return this.http.get(`${this.url}/account/module_menu/with_granted/`, options)
            .pipe(
                tap((response: any) => response as HttpUserEvent<AccountModule[]>),
                catchError(() => from([]))
            );
    }
}
