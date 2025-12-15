import {Component, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from "../../core/imports/material.import";
import {BaseComponent} from "../../core/abstracts/base-component";

interface ClientInterface {
    id: number;
    name: string;
    age: number;
    cpf: string;
}

@Component({
    selector: 'app-client',
    standalone: true,
    imports: [...MATERIAL_IMPORTS],
    template: `
        <h1>Cliente</h1>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

            <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef> No.</th>
                <td mat-cell *matCellDef="let element"> {{ element.id }}</td>
            </ng-container>

            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> Nome</th>
                <td mat-cell *matCellDef="let element"> {{ element.name }}</td>
            </ng-container>

            <ng-container matColumnDef="age">
                <th mat-header-cell *matHeaderCellDef> Idade</th>
                <td mat-cell *matCellDef="let element"> {{ element.age }}</td>
            </ng-container>

            <ng-container matColumnDef="cpf">
                <th mat-header-cell *matHeaderCellDef> CPF</th>
                <td mat-cell *matCellDef="let element"> {{ element.cpf }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `
})
export class Client extends BaseComponent<ClientInterface> implements OnInit {
    public displayedColumns: string[] = ['id', 'name', 'age', 'cpf'];

    constructor() {
        super();
    }

    public ngOnInit(): void {
        this.getClient();
    }

    public getClient() {
        this.httpService.getAll(this.baseUrl + '/core/client/').subscribe(
            response => {
                this.dataSource = response['results'];
            }
        )
    }

}
