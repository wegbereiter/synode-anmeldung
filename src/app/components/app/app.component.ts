import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({
    selector: 'base-app',
    template: require('./app.html'),
    styles: [require('./app.css')],
})
export class AppComponent {
    private data = {
        name: null,
        email: null,
        street: null,
        zip: null,
        city: null,
        country: 'Deutschland',
        mobile: null,
        allergies: null,
        birthday: null,
        npc: false,
        itName: null,
        sigil: null,
        room: null,
        accept: false,
    };

    private isLoading = false;
    private isSuccessful = false;

    private error = null;

    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public sendForm() {
        const body = JSON.stringify(this.normalize());
        const headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        this.isLoading = true;
        this.error = null;
        return this.http
            .post('/register', body, options)
            .toPromise()
            .then(() => {
                this.isLoading = false;
                this.isSuccessful = true;
            })
            .catch((res) => {
                this.isLoading = false;
                this.error = res._body;
                console.log(res._body)
            });
    }

    private normalize() {
        Object.keys(this.data).forEach((key) => {
            if (!this.data[key]) this.data[key] = false;
        });
        return this.data;
    }
}
