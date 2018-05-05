import * as moment from 'moment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { Component } from '@angular/core';
import { FormData } from './shared/data';
import { ImprintDialog } from './imprint/imprintDialog.component';
import { MatDialog } from '@angular/material';

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
        licensePlate: null,
        diet: null,
        allergies: null,
        fears: null,
        birthday: null,
        npc: false,
        itName: null,
        itPowers: null,
        sigil: null,
        room: null,
        accept: false,
        minAge: true,
    };

    public isLoading = false;
    public isSuccessful = false;
    public bedCount$: Observable<any> = null;

    public minAge = null;
    public startDate = moment('2018-01-26');
    public endDate = moment('2018-01-28');

    public error = null;

    constructor(private http: HttpClient, private dialog: MatDialog) {
        this.data.minAge = !this.minAge;
    }

    public ngOnInit() {
        this.bedCount$ = interval(20000).pipe(
            startWith(0),
            switchMap(() => this.http.get('/api/count')),
            tap(x => console.log(x)),
        )
    }

    get maxBirthday() {
        if (!this.minAge) return null;
        return this.startDate.clone().subtract(18, 'years');
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
