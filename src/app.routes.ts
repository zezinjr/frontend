import {Routes} from '@angular/router';
import {AppLayout} from "./app/layout/component/app.layout";
import {Dashboard} from "./app/pages/dashboard/dashboard";
import {authGuard} from "./app/pages/auth/guards/auth-guard";


export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes').then(m => m.routes),
    },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: Dashboard
            },
            {
                path: 'tecommerce',
                loadChildren: () => import('./app/pages/tecommerce/tecommerce.routes').then(m => m.routes)
            }
        ]
    }
];
