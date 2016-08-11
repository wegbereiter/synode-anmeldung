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

import {ANGULAR_MODULES} from './vendor/angular';
import {MATERIAL_MODULES} from './vendor/material';

export const VENDOR_MODULES = [
    ...MATERIAL_MODULES,
    ...ANGULAR_MODULES,
];
