import {
    inject,
    TestBed,
} from '@angular/core/testing';

import {AppComponent} from './app.component';

describe('App component', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [AppComponent],
    }));

    it('is successful', inject([AppComponent], (app: AppComponent) => {
        expect(1).toBe(1)
    }));
});
