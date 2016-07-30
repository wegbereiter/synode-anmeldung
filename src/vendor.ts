import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs';

import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import {PLATFORM_DIRECTIVES} from '@angular/core';
import {ANGULAR_DIRECTIVES, ANGULAR_PROVIDERS} from './vendor/angular';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from './vendor/material';

const VENDOR_DIRECTIVES = [
    ...MATERIAL_DIRECTIVES,
    ...ANGULAR_DIRECTIVES,
];

export const VENDOR_PROVIDERS = [
    ...MATERIAL_PROVIDERS,
    ...ANGULAR_PROVIDERS,
    {provide: PLATFORM_DIRECTIVES, useValue: VENDOR_DIRECTIVES, multi: true},
];
