import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {AuthService} from "../../pages/auth/services/auth-service";
import {Subject, take} from "rxjs";
import {MenuResponse} from "../../pages/auth/interfaces/menu-response";
import {AccountModule} from "../../pages/auth/interfaces/account-module";
import {MATERIAL_IMPORTS} from "../../core/imports/material.import";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MenuItem} from "../../pages/auth/interfaces/menu-item";

@Component({
    selector: 'app-sidebar',
    imports: [
        ...MATERIAL_IMPORTS, RouterLink, RouterLinkActive
    ],
    standalone: true,
    template: `
        <div class="layout-sidebar">
            <ul class="layout-menu">

                <mat-nav-list>
                    @for (menu of menus(); track $index) {
                        @if (!menu.hidden) {
                            <h3 mat-subheader style="margin-left: 0">{{ menu.label }}</h3>
                            @for (menu_item of menu.items; track $index) {
                                @if (!menu_item.hidden) {
                                    <div style="display: flex; align-items: center; gap: 2rem">
                                        <a
                                                mat-list-item
                                                [id]="'menu-' + menu_item.label"
                                                [matTooltip]="menu_item.label"
                                                matTooltipPosition="right"
                                                [matTooltipShowDelay]="500"
                                                [routerLink]="[menu_item?.route]"
                                                [routerLinkActive]="['active']"
                                                [routerLinkActiveOptions]="{exact: false}">
                                            @if (menu_item.icon) {
                                                <mat-icon matListItemIcon [fontSet]="menu_item?.font_set">{{ menu_item?.icon }}
                                                </mat-icon>
                                            }

                                            {{ menu_item.label }}
                                        </a>

                                        @if (menu_item.divider) {
                                            <mat-divider></mat-divider>
                                        }
                                    </div>

                                }
                            }
                        }
                    }
                </mat-nav-list>

            </ul>
        </div>
    `
})
export class AppSidebar implements OnInit {

    public menus: WritableSignal<MenuItem[]> = signal([]);
    public modules: Subject<AccountModule[]> = new Subject();

    constructor(private authService: AuthService,) {
    }

    public ngOnInit() {
        this.loadMenus();
        this.loadModules();
    }

    private loadModules(): void {
        this.authService.loadModulesAllowed()
            .pipe(take(1))
            .subscribe((response: AccountModule[]): void => this.modules.next(response));
    }

    private loadMenus(): void {
        this.menus.set([]);
        this.modules.subscribe(modules => {
            const modules_urls = [...new Set(modules['results'].filter(m => m.granted).map(m => m.module))];
            this.authService.loadMenus(modules_urls)
                .pipe(take(1))
                .subscribe((response: MenuResponse): void => {
                    if (response.routes && response.results) {
                        this.menus.set(response.results);
                    }
                });
        });
    }
}
