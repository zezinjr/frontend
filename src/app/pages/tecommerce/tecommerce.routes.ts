import {Routes} from "@angular/router";
import {Client} from "./client";
import {Employee} from "./employee";
import {Product} from "./product";
import {Sale} from "./sale";


export const routes: Routes = [
    {
        path: 'client',
        component: Client
    },
    {
        path: 'employee',
        component: Employee
    },
    {
        path: 'product',
        component: Product
    },
    {
        path: 'sale',
        component: Sale
    }
]