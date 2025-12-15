import {Component, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from "../../core/imports/material.import";
import {BaseComponent} from "../../core/abstracts/base-component";

interface SaleInterface {
    id: number;
    description: string;
    quantity: number;
}

@Component({
    selector: 'app-sale',
    standalone: true,
    imports: [...MATERIAL_IMPORTS],
    template: `
        <h1>Vendas</h1>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

            <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef> No.</th>
                <td mat-cell *matCellDef="let element"> {{ element.id }}</td>
            </ng-container>

            <ng-container matColumnDef="product">
                <th mat-header-cell *matHeaderCellDef> Descrição</th>
                <td mat-cell *matCellDef="let element"> {{ element.product.description }}</td>
            </ng-container>

            <ng-container matColumnDef="client">
                <th mat-header-cell *matHeaderCellDef> Cliente</th>
                <td mat-cell *matCellDef="let element"> {{ element.client.name }}</td>
            </ng-container>

            <ng-container matColumnDef="employee">
                <th mat-header-cell *matHeaderCellDef> Funcionário</th>
                <td mat-cell *matCellDef="let element"> {{ element.employee.name }}</td>
            </ng-container>

            <ng-container matColumnDef="nrf">
                <th mat-header-cell *matHeaderCellDef> Nota Fiscal</th>
                <td mat-cell *matCellDef="let element"> {{ element.nrf }}</td>
            </ng-container>



            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `
})
export class Sale extends BaseComponent<SaleInterface> implements OnInit {
    public displayedColumns: string[] = ['id', 'product', 'client', 'employee', 'nrf'];

    constructor() {
        super();
    }

    public ngOnInit(): void {
        this.getSale();
    }

    public getSale() {
        this.httpService.getAll(this.baseUrl + '/core/sale/').subscribe(
            response => {
                this.dataSource = response['results'];
            }
        )
    }

}
