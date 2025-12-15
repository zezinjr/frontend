import {Component, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from "../../core/imports/material.import";
import {BaseComponent} from "../../core/abstracts/base-component";


interface EmployeeInterface {
    id: number;
    name: string;
    registration: string;
}

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [...MATERIAL_IMPORTS],
    template: `
        <h1>Funcionário</h1>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

            <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef> No.</th>
                <td mat-cell *matCellDef="let element"> {{ element.id }}</td>
            </ng-container>

            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> Nome</th>
                <td mat-cell *matCellDef="let element"> {{ element.name }}</td>
            </ng-container>

            <ng-container matColumnDef="registration">
                <th mat-header-cell *matHeaderCellDef> Registro</th>
                <td mat-cell *matCellDef="let element"> {{ element.registration }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `
})
export class Employee extends BaseComponent<EmployeeInterface> implements OnInit {
    public displayedColumns: string[] = ['id', 'name', 'registration'];

    constructor() {
        super();
    }

    public ngOnInit(): void {
        this.getEmployee();
    }

    public getEmployee() {
        this.httpService.getAll(this.baseUrl + '/core/employee/').subscribe(
            response => {
                this.dataSource = response['results'];
            }
        )
    }

}
