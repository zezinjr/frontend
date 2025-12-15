import {User} from "../interfaces/user";
import {MenuItem} from "../interfaces/menu-item";
import {Module} from "../interfaces/module";
import {Injectable} from "@angular/core";

@Injectable()
export class AppVariables {
    user?: User;
    menu?: MenuItem[];
    module?: Module;
    routes?: string[] | string;
}