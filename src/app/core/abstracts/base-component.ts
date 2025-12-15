import {environment} from "../../../environments/environment";
import {HttpService} from "../services/http.service";
import {inject} from "@angular/core";

export class BaseComponent<T> {
    protected baseUrl: string = environment.apiUrl;
    protected httpService: HttpService<T> = inject(HttpService);
    protected dataSource: T[];
}