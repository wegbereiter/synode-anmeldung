import {Component} from '@angular/core';

@Component({
    selector: 'base-app',
    template: `
    <md-card>
        <md-card-title>Hello World</md-card-title>
        <md-card-content><p>Some content</p></md-card-content>
    </md-card>
    `,
})
export class AppComponent {}
