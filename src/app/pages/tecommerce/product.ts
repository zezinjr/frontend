import {Component, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from "../../core/imports/material.import";
import {BaseComponent} from "../../core/abstracts/base-component";

interface ProductInterface {
    id: number;
    description: string;
    quantity: number;
}

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [...MATERIAL_IMPORTS],
    template: `
        <h1>Produto</h1>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

            <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef> No.</th>
                <td mat-cell *matCellDef="let element"> {{ element.id }}</td>
            </ng-container>

            <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef> Descrição</th>
                <td mat-cell *matCellDef="let element"> {{ element.description }}</td>
            </ng-container>

            <ng-container matColumnDef="quantity">
                <th mat-header-cell *matHeaderCellDef> Quantidade</th>
                <td mat-cell *matCellDef="let element"> {{ element.quantity }}</td>
            </ng-container>


            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `
})
export class Product extends BaseComponent<ProductInterface> implements OnInit {
    public displayedColumns: string[] = ['id', 'description', 'quantity'];

    constructor() {
        super();
    }

    public ngOnInit(): void {
        this.getProduct();
    }

    public getProduct() {
        this.httpService.getAll(this.baseUrl + '/core/product/').subscribe(
            response => {
                this.dataSource = response['results'];
            }
        )
    }

}
