import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "./services/auth-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    styles: `
        .login-card {
            min-width: 500px;
            background: #fff;
            box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
        }
    `,
    imports: [MatCardModule, MatFormFieldModule, MatInput, MatButton, ReactiveFormsModule],
    template: `
        <section class="flex column h-screen justify-center items-center">
            <mat-card class="login-card p-8">
                <mat-card-title>Login</mat-card-title>
                <mat-card-subtitle>Coloque suas credenciais de acesso para continuar.</mat-card-subtitle>

                <mat-card-content class="mt-8">
                    <form class="flex flex-col" [formGroup]="formGroup">
                        <mat-form-field class="mb-4">
                            <mat-label>Usuário</mat-label>
                            <input formControlName="username" matInput type="text">
                            <mat-error>Insira seu usuário</mat-error>
                        </mat-form-field>

                        <mat-form-field class="mb-4">
                            <mat-label>Senha</mat-label>
                            <input formControlName="password" matInput type="password">
                            <mat-error>Insira sua senha</mat-error>
                        </mat-form-field>

                        <button mat-stroked-button [disabled]="!formGroup.valid" (click)="signIn()">{{ labelButton }}</button>
                    </form>
                </mat-card-content>
            </mat-card>

            <footer class="fixed bottom-10 right-10">
                <p>Desenvolvido por: Frank Lima</p>
            </footer>
        </section>

    `
})
export class Login implements OnInit {
    protected formGroup: FormGroup;
    public labelButton: string = 'Logar';

    constructor(private authService: AuthService,
                private _formBuilder: FormBuilder,
                private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    public signIn(): void {
        this.labelButton = 'Logando...';
        this.authService.login(this.formGroup.value).subscribe(
            {
                next: () => {
                    this.labelButton = 'Logado';
                    this.router.navigate(['/']).then();
                },
                error: () => {
                    this.labelButton = 'Logar';
                }
            }
        );
    }
}
