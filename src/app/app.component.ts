import * as moment from 'moment';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, interval } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { FormData } from './shared/data';
import { ImprintDialog } from './imprint/imprintDialog.component';
import { MatDialog } from '@angular/material';

interface Config {
    npcBeds?: number;
    pcBeds?: number;
    minAge?: number;
    start?: string;
    end?: string;
    name?: string;
    subname?: string;
    description?: string;
    type?: string;
    location?: string[];
    website?: string;
    pcPrice?: number;
    npcPrice?: number;
}

@Component({
    selector: 'wb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
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
    public config: Config = {};

    public onDestroy$ = new Subject();
    public bedCount$: Observable<any> = null;

    public startDate = moment();
    public endDate = moment();

    public error = null;

    constructor(private http: HttpClient, private dialog: MatDialog) {
    }

    public ngOnInit() {
        this.bedCount$ = interval(20000).pipe(
            startWith(0),
            switchMap(() => this.http.get('/api/count')),
            tap(x => console.log(x)),
        )

        this.http
          .get<Config>("/api/config")
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((config) => {
              this.config = config;
              this.data.minAge = !config.minAge;
              this.startDate = moment(config.start);
              this.endDate = moment(config.end);
          });
    }

    public ngOnDestroy() {
        this.onDestroy$.next();
    }

    get maxBirthday() {
        if (!this.config.minAge) return null;
        return this.startDate.clone().subtract(this.config.minAge, 'years');
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
