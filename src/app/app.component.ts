import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormData } from './shared/data';

@Component({
    selector: 'wb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private data: FormData = {
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

    public isLoading = false;
    public isSuccessful = false;
    public bedCount$: Observable<any> = null;

    public error = null;

    constructor(private http: Http) {}

    public ngOnInit() {
        this.bedCount$ = Observable.interval(20000)
            .startWith(0)
            .switchMap(() => this.http.get('/api/count'))
            .map(res => res.json())
            .do(x => console.log(x));
    }

    public sendForm(data) {
        data.birthday = data.birthday.format('DD.MM.YYYY');
        const body = JSON.stringify(data);
        const headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers });

        this.isLoading = true;
        this.error = null;

        return this.http
            .post('/api/register', body, options)
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
}
