import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { Component } from '@angular/core';
import { FormData } from './shared/data';
import { ImprintDialog } from './imprint/imprintDialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

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

    constructor(private http: HttpClient, private dialog: MatDialog) { }

    public ngOnInit() {
        this.bedCount$ = Observable.interval(20000).pipe(
            startWith(0),
            switchMap(() => this.http.get('/api/count')),
            // map(res => res.json()),
            tap(x => console.log(x)),
        )
    }

    public openImprint() {
        this.dialog.open(ImprintDialog, { width: '90%' });
    }

    public sendForm(data) {
        data.birthday = data.birthday.format('DD.MM.YYYY');
        const body = JSON.stringify(data);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers };

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
                console.log(res)
            });
    }
}
