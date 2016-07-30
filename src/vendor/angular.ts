import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

export const ANGULAR_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,
];

export const ANGULAR_PROVIDERS = [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
];
