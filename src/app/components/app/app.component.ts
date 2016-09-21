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

    public sendForm(data) {
        data.birthday = this.formatDate(data.birthday);
        const body = JSON.stringify(data);
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

    private formatDate(date) {
        if (date instanceof Date) {
            return [this.pad(date.getFullYear(), 4), this.pad(date.getMonth()+1, 2), this.pad(date.getDate(), 2)].join('-');
        }
        return date;
    }

    private pad(num, size) {
        return ('0000000' + num).substr(-size);
    }
}
