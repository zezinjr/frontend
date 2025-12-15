import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AppTopbar} from "./app.topbar";
import {AppSidebar} from "./app.sidebar";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        AppTopbar,
        AppSidebar
    ],
    template: `
        <div class="layout-wrapper" [ngClass]="'layout-static'">
            <app-topbar></app-topbar>
            <app-sidebar></app-sidebar>

            <div class="layout-main-container">
                <div class="layout-main">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `
})
export class AppLayout {

}
