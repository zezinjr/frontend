import {Component} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    imports: [],
    standalone: true,
    template: `
        <div class="flex flex-col h-200 justify-center items-center">
            <h1>Bem vindo!</h1>
            <p>Este sistema foi criado especialmente para o curso de computação em nuvem!</p>
        </div>
    `
})
export class Dashboard {

}
